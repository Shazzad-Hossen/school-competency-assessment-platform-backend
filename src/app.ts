import express, { Express, Router } from 'express';
import settings from './settings';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import form from 'express-form-data';
import http, { Server } from 'http';
import services from './services';
import { ConfigureContext } from './utils/types/configure-context';


interface Dep {
  method: (...args: any[]) => Promise<any>;
  args: any[];
}

interface Config {
  port: number;
  origin: string;
  mongodb_uri: string;
}



class App {
  private express: Express;
  private router: Router;
   private server!: Server;
  private config: Config;
  private depPromises?: Promise<any>[];

  constructor({ deps }: { deps?: Dep[] } = {}) {
    this.express = express();
    this.router=  express.Router();
    this.config = settings;
   

    if (deps) {
      this.depPromises = deps.map(({ method, args }) => method(...args));
    }

    this.server = http.createServer(this.express); 
  }

  private init() {
    // Add basic middleware here if you want
    this.express.use(express.json());
    this.express.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
    this.express.use(morgan('common'));
    this.express.use(cookieParser());
    this.express.use(form.parse());
    this.express.use('/api', this.router);
    services(this);
    this.express.get('/', (req, res) => {
      res.send('Hello from App!');
    });
  }

  public async start(): Promise<void> {
    if (this.depPromises) {
      try {
        const result =  await Promise.all(this.depPromises);
        result.forEach(r=>console.log(r))
      } catch (err) {
        console.error('Dependency initialization failed:', err);
        process.exit(1);
      }
    }

    this.init();

    const port = this.config.port;
    this.server.listen(port, () => {
      console.log(`=> Listening on port ${port}.`);
    });
  }


configure(callback: (this: ConfigureContext) => void): void {
  const context: ConfigureContext = Object.create(this.express);

  context.route = this.router;
  context.settings = this.config;

  callback.call(context);
}

}

export default App;

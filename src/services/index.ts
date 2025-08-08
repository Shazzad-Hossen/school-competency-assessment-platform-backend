import demo from './demo/demo';
import App from '../app';
import user from './user/user';

export default (app: App): void => {
  app.configure(demo);
  app.configure(user);
};

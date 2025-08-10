import demo from './demo/demo';
import App from '../app';
import user from './user/user';
import question from './question/question';

export default (app: App): void => {
  app.configure(demo);
  app.configure(user);
  app.configure(question);
};

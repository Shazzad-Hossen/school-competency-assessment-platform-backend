import { ConfigureContext } from '../../utils/types/configure-context';
import { auth } from '../middlewares';
import { createUser, getMe, signIn } from './user.entity';

function user(this: ConfigureContext) {
  this.route.post('/user', createUser(this));
  this.route.post('/signin', signIn(this));
  this.route.get('/me',auth, getMe());
}

export default user;

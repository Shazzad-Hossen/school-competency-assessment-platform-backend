import { ConfigureContext } from '../../utils/types/configure-context';
import { createUser } from './user.entity';

function user(this: ConfigureContext) {
  this.route.post('/user', createUser(this));
}

export default user;

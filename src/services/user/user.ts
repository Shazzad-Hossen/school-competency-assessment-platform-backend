import { ConfigureContext } from '../../utils/types/configure-context';
import { auth } from '../middlewares';
import { createUser, getMe, sendVerificationOtp, signIn, signOut, verifyOtp } from './user.entity';

function user(this: ConfigureContext) {
  this.route.post('/user', createUser(this));
  this.route.post('/signin', signIn(this));
  this.route.get('/me',auth, getMe());
  this.route.post('/send-otp', sendVerificationOtp(this));
  this.route.post('/verify-otp', verifyOtp(this));
  this.route.post('/signout', signOut(this));
}

export default user;

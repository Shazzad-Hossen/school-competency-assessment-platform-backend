import { ConfigureContext } from '../../utils/types/configure-context';
import { auth } from '../middlewares';
import { createQuestion, deleteQuestion, getAssessmentQuestions, getQuestion, getQuestions, updateQuestion } from './question.entity';

function question(this: ConfigureContext) {
  this.route.post('/question', auth , createQuestion());
  this.route.get('/question', auth , getQuestions());
  this.route.get('/question/assesment', auth , getAssessmentQuestions());
  this.route.get('/question/:id', auth , getQuestion());
  this.route.patch('/question/:id', auth , updateQuestion());
  this.route.delete('/question/:id', auth , deleteQuestion());
}


export default question;

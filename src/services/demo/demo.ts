import { Router } from 'express';
import { getDemoStatus } from './demo.entity';
import { ConfigureContext } from '../../utils/types/configure-context';

function demo(this: ConfigureContext) {
  this.route.get('/demo', getDemoStatus(this));
}

export default demo;

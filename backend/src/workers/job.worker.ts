import { processJobs } from '../services/queue.service';

processJobs();
console.log('Job worker started...');
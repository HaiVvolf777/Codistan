import Queue, { Job, JobId } from 'bull';

interface JobData {
  [key: string]: any;
}

const jobQueue = new Queue<JobData>('jobs', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

export const addJob = async (data: JobData, timestamp: number) => {
  const delay = Math.max(timestamp - Date.now(), 1000);
  console.log(
    `Job delay: ${delay}ms, scheduled at ${new Date(
      Date.now() + delay,
    ).toISOString()}`,
  );
  return jobQueue.add(data, { delay });
};

export const processJobs = () => {
  jobQueue.process(async (job: Job<JobData>) => {
    console.log(`Processing job ${job.id} at ${new Date().toISOString()}`);
    console.log('Job data:', job.data);

    // Simulate some async work
    if (job.data.type === 'email') {
      console.log('Simulating sending email...');
      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Email sent successfully (simulated)');
    }
    return { result: 'Job completed successfully' };
  });
};

export const getJobInfoByID = async (jobID: JobId) => {
  const job = await jobQueue.getJob(jobID);

  if (!job) {
    return null;
  }

  const state = await job.getState();
  const result = job.returnvalue;
  const failedReason = job.failedReason;
  const progress = job.progress;
  const attemptsMade = job.attemptsMade;

  return {
    jobId: job.id,
    data: job.data,
    state,
    result,
    failedReason,
    progress,
    attemptsMade,
    createdAt: job.timestamp,
    processedAt: job.processedOn,
    finishedAt: job.finishedOn,
  };
};

export default jobQueue;

import { Request, response, Response } from 'express';
import { addJob, getJobInfoByID } from '../services/queue.service';

export const createJob = async (req: Request, res: Response) => {
  const { data, timestamp } = req.body;
  const job = await addJob(data, timestamp);
  res.json({ jobId: job.id });
};

export const getJobById = async (req: Request, res: Response) => {
  const jobId = req.params.id;
  const jobDetails = await getJobInfoByID(jobId);
  res.json({
    data: jobDetails,
  });
};

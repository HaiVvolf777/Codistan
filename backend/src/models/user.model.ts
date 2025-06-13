import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export type User = z.infer<typeof UserSchema>;
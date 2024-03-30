import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  confirmEmail: z.string().optional(),
  phoneNumber: z.string().optional(),
  message: z.string().min(1, 'Message is required')
});

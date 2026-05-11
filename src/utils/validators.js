import { z } from 'zod';

export const candidateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[+\d\s\-(). ]+$/, 'Invalid phone number format'),
  college: z.string().min(2, 'College name is required').max(100),
  skills: z.array(z.string()).min(1, 'Add at least one skill').max(10, 'Maximum 10 skills'),
  status: z.enum(['Pending', 'Selected', 'Rejected', 'In Review'], {
    required_error: 'Please select a status',
  }),
  experience: z.enum(['Fresher', '1 year', '2 years'], {
    required_error: 'Please select an experience level',
  }),
  location: z.string().min(2, 'Location is required').max(100),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

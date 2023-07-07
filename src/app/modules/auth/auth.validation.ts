import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is Required' }),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh Token is Required' }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};

import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required',
    }),
  }),
});

const updatefacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updatefacultyZodSchema,
};

import { z } from 'zod';

const carValidationSchema = z.object({
  body: z.object({
    brand: z.string().nonempty('Brand is required'),
    model: z.string().nonempty('Model is required'),
    year: z
      .number({
        required_error: 'Year is required',
        invalid_type_error: 'Year must be a number',
      })
      .int('Year must be an integer')
      .gte(1886, 'Year must be 1886 or later'),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, 'Price must be a non-negative number'),
    category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
      errorMap: () => ({ message: 'Category is not valid' }),
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    description: z.string().nonempty('Description is required'),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .int('Quantity must be an integer')
      .min(0, 'Quantity must be a non-negative number'),
    inStock: z.boolean({
      required_error: 'InStock is required',
      invalid_type_error: 'InStock must be a boolean',
    }),
  }),
});

const updateCarValidationSchema = z.object({
  body: z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z
      .number()
      .int('Year must be an integer')
      .gte(1886, 'Year must be 1886 or later')
      .optional(),
    price: z.number().min(0, 'Price must be a non-negative number').optional(),
    category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']).optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().int('Quantity must be an integer').min(0, 'Quantity must be a non-negative number').optional(),
    inStock: z.boolean().optional(),
  }),
});

export const CarValidations = {
  carValidationSchema,
  updateCarValidationSchema,
};

import { z } from 'zod';

// Define the Zod schema for car validation
export const carValidationSchema = z.object({
  brand: z.string().nonempty('Brand is required'), // Ensure brand is a non-empty string
  model: z.string().nonempty('Model is required'), // Ensure model is a non-empty string
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    })
    .int('Year must be an integer')
    .gte(1886, 'Year must be 1886 or later'), // Minimum year validation
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(0, 'Price must be a non-negative number'), // Non-negative price
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => ({ message: 'Category is not match"' }),
  }), // Enum validation with error message
  description: z.string().nonempty('Description is required'), // Ensure description is non-empty
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .int('Quantity must be an integer')
    .min(0, 'Quantity must be a non-negative number'), // Non-negative quantity
  inStock: z.boolean({
    required_error: 'InStock is required',
    invalid_type_error: 'InStock must be a boolean',
  }), // Boolean validation
});
export default carValidationSchema;

import { model, Schema } from "mongoose";
import { Tcar } from "./car.interface";

const carSchema = new Schema<Tcar>({
    brand: {
        type: String,
        required: true,
        trim: true,
      },
      model: {
        type: String,
        required: true,
        trim: true,
      },
      year: {
        type: Number,
        required: true
        
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      category: {
        type: String,
        enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        required: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      inStock: {
        type: Boolean,
        required: true,
        default: true,
      }
},
{ timestamps: true }
)

export const CarModel = model<Tcar>('Car',carSchema)
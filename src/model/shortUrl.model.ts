import mongoose, { Document } from 'mongoose';

export interface ShortUrl extends Document {
    destination: string;
    transformedUrl:string
    accessCount: number;
}


const schema = new mongoose.Schema({
  destination: { type: String, required: true },
  transformedUrl: { type: String, required: true, unique: true },
  accessCount: { type: Number, default: 0 } // Ensure this field exists
});


const ShortUrlModel = mongoose.model<ShortUrl>("ShortUrl", schema);

export default ShortUrlModel;

import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  message: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);

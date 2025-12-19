import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  proficiency: { type: Number, min: 0, max: 100, default: 50 }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);

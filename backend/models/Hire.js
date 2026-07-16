import mongoose from 'mongoose'

const hireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: String,
    required: true,
    trim: true
  },
  timeline: {
    type: String,
    trim: true
  },
  details: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Hire = mongoose.model('Hire', hireSchema)
export default Hire

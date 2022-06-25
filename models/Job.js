import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, 'Please provide posiiton'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Interviewing', 'Declined', 'Applied', 'Accepted'],
      default: 'Applied',
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
      default: 'Full-Time',
    },
    jobLocation: {
      type: String,
      default: 'remote',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);

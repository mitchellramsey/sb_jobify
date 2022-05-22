import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
  },
  lastName: {
    type: String,
    default: 'lastName',
    maxlength: 20,
    trim: true,
  },
  location: {
    type: String,
    default: 'my city',
    trim: true,
  },
});

export default mongoose.model('User', UserSchema);

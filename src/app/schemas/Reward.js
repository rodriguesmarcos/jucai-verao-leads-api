import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  given: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
  },
});

export default mongoose.model('Reward', RewardSchema);

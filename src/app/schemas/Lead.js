import mongoose from 'mongoose';

const LeadRewardSchema = new mongoose.Schema(
  {
    reward_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    reward: {
      type: LeadRewardSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Lead', LeadSchema);

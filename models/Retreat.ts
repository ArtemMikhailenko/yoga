import mongoose from 'mongoose';

export interface IRetreat {
  _id?: string;
  title: {
    ru: string;
    en: string;
  };
  subtitle: {
    ru: string;
    en: string;
  };
  dates: string;
  duration: string;
  location: {
    ru: string;
    en: string;
  };
  price: string;
  earlyBirdPrice?: string;
  earlyBirdDeadline?: string;
  pricingTiers?: Array<{
    deadline: string;
    price: string;
  }>;
  description: {
    ru: string;
    en: string;
  };
  highlights: {
    ru: string[];
    en: string[];
  };
  included: {
    ru: string[];
    en: string[];
  };
  notIncluded: {
    ru: string[];
    en: string[];
  };
  imageUrl: string;
  maxParticipants?: number;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const RetreatSchema = new mongoose.Schema<IRetreat>(
  {
    title: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    subtitle: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    dates: { type: String, required: true },
    duration: { type: String, required: true },
    location: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    price: { type: String, required: true },
    earlyBirdPrice: { type: String },
    earlyBirdDeadline: { type: String },
    pricingTiers: [
      {
        deadline: { type: String },
        price: { type: String },
      },
    ],
    description: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
    },
    highlights: {
      ru: [{ type: String }],
      en: [{ type: String }],
    },
    included: {
      ru: [{ type: String }],
      en: [{ type: String }],
    },
    notIncluded: {
      ru: [{ type: String }],
      en: [{ type: String }],
    },
    imageUrl: { type: String, required: true },
    maxParticipants: { type: Number },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Retreat || mongoose.model<IRetreat>('Retreat', RetreatSchema);

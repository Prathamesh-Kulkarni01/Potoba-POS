import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String,  },
  email: { type: String,  unique: true },
  password: { type: String,  },
  phone: { type: String,  },
  address: { type: String,  },
  onboarded: { type: Boolean, default: false },
}, { timestamps: true });

const Restaurant = mongoose.models?.Restaurant || mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;

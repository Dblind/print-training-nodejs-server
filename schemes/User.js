import mongoose from 'mongoose';

const User = mongoose.Schema({
  login: { type: String, require: true, },
  password: { type: String, require: true, },
});

export default mongoose.model("user", User);

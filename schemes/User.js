import mongoose from 'mongoose';

const User = mongoose.Schema({
  login: { type: String, unique: true, require: true, },
  password: { type: String, require: true, },
  roles: [{type: String, ref: "Role", }],
  texts: [String],
});

export default mongoose.model("user", User);

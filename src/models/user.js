import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', function setDefaultUsername() {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const User = model('User', userSchema);

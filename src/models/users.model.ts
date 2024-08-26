import { Schema, model } from 'mongoose';
import { User, UserRole } from '../interfaces/user.interface';

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, email: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, enum: UserRole },
    gender: { type: String, required: true, trim: true, enum: ['male', 'female', 'other'] },
    password: { type: String, required: true, trim: true },
    active: { type: Boolean, required: true, trim: true, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model<User>('user', UserSchema);

export default UserModel;

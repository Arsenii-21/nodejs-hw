import { Schema, model } from 'mongoose';

export const TAGS = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
];

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, trim: true, default: '' },
    tag: { type: String, enum: TAGS, default: 'Todo' },
  },
  { timestamps: true, versionKey: false },
);

export const Note = model('Note', noteSchema);

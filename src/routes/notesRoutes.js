import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

router.get('/notes', getAllNotesSchema, asyncHandler(getAllNotes));
router.get('/notes/:noteId', noteIdSchema, asyncHandler(getNoteById));
router.post('/notes', createNoteSchema, asyncHandler(createNote));
router.patch('/notes/:noteId', updateNoteSchema, asyncHandler(updateNote));
router.delete('/notes/:noteId', noteIdSchema, asyncHandler(deleteNote));

export default router;

import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';
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

router.use('/notes', authenticate);

router.get('/notes', celebrate(getAllNotesSchema), asyncHandler(getAllNotes));
router.get(
  '/notes/:noteId',
  celebrate(noteIdSchema),
  asyncHandler(getNoteById),
);
router.post('/notes', celebrate(createNoteSchema), asyncHandler(createNote));
router.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema),
  asyncHandler(updateNote),
);
router.delete(
  '/notes/:noteId',
  celebrate(noteIdSchema),
  asyncHandler(deleteNote),
);

export default router;

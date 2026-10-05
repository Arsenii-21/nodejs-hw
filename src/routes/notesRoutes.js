import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

router.get('/notes', asyncHandler(getAllNotes));
router.get('/notes/:noteId', asyncHandler(getNoteById));
router.post('/notes', asyncHandler(createNote));
router.patch('/notes/:noteId', asyncHandler(updateNote));
router.delete('/notes/:noteId', asyncHandler(deleteNote));

export default router;

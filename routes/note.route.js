const express = require('express');
const router = express.Router();

const { body, param } = require('express-validator');

const {createNote, getAllNotes, likeANote, unlikeANote, deleteNotes} = require("../controllers/note.controller")

router.post('/',[
    body('title')
      .notEmpty().withMessage('Title is required')
      .isLength({ max: 100 }).withMessage('Title can be at most 100 characters'),
    body('content')
      .notEmpty().withMessage('Content is required'),
  ], createNote);

router.get('/', getAllNotes);

router.patch('/:id/like',[param('id').isMongoId().withMessage('Invalid note ID')], likeANote);

router.patch('/:id/unlike',[param('id').isMongoId().withMessage('Invalid note ID')], unlikeANote);

router.delete('/:id', [param('id').isMongoId().withMessage('Invalid note ID')], deleteNotes);

module.exports = router;

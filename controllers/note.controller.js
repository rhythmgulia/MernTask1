const express = require("express")
const mongoose = require("mongoose")
const Note = require('../models/note');

let createNote = async (req, res) => {
  const { content, author, likes } = req.body;

  try {
    const newNote = new Note({
      content,
      author,
      likes: likes ?? 0, 
    });

    const savedNote = await newNote.save();
    res.status(201).json({ message: `Note by ${savedNote.author} created!`, note: savedNote });
  } catch (err) {
    res.status(500).json({ error: `Failed to create note: ${err.message}` });
  }
}

let getAllNotes = (req, res) => {
  Note.find().sort({ createdAt: -1 })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: `Error fetching notes: ${err.message}` }));
}

let likeANote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: `Note with id ${id} not found.` });

    note.likes = (note.likes ?? 0) + 1;
    const updated = await note.save();

    res.json({ message: `Note liked! Total likes: ${updated.likes}`, note: updated });
  } catch (err) {
    res.status(500).json({ error: `Failed to like note: ${err.message}` });
  }
}

let unlikeANote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: `Note with id ${id} not found.` });

    note.likes = Math.max((note.likes ?? 0) - 1, 0);
    const updated = await note.save();

    res.json({ message: `Note unliked! Total likes: ${updated.likes}`, note: updated });
  } catch (err) {
    res.status(500).json({ error: `Failed to unlike note: ${err.message}` });
  }
}

let deleteNotes = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: `Note with id ${id} not found.` });

    res.json({ message: `Note by ${deleted?.author} deleted.` });
  } catch (err) {
    res.status(500).json({ error: `Failed to delete note: ${err.message}` });
  }
}

module.exports = {
    createNote,
    getAllNotes,
    likeANote,
    unlikeANote,
    deleteNotes
}

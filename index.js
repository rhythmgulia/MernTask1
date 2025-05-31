const express = require('express');
const mongoose = require('mongoose');
const notesRouter = require('./routes/note.route');
const userRouter = require("./routes/user.route")
const cors = require("cors")
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URL).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(`MongoDB error: ${err.message}`));

app.use('/notes', notesRouter);
app.use('/user', userRouter);

const PORT = 8008;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

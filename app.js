const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const userRoutes = require('./routes/user-routes.js');

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected!'));

// routes middlewares
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

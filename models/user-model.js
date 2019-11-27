const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = requier('uuid/v1');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

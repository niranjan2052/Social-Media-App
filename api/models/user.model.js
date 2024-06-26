const mongoose = require("mongoose");
const { modelConfig } = require("../config");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
      profilePicture: {
        type: String,
        default: "",
      },
      coverPicture: {
        type: String,
        default: "",
      },
      followers: {
        type: Array,
        default: [],
      },
      followings: {
        type: Array,
        default: [],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      desc: {
        type: String,
        max: 200,
      },
      city: {
        type: String,
        max: 50,
      },
      from: {
        type: String,
        max: 50,
      },
      relationship: {
        type: Number,
        enum: [1, 2, 3],
      },
    },
    modelConfig
  )
);

const { model, Schema } = require("mongoose");
const { modelConfig } = require("../config");

module.exports = model(
  "Post",
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
    },
    modelConfig
  )
);

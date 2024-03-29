import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: String,
  date: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Post", postSchema);

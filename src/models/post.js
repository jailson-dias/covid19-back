import mongoose from "mongoose";

const post = new mongoose.Schema({
  owner: {
    type: String,
    required: [true, "The owner is required"]
  },
  title: {
    type: String,
    required: [true, "The title is required"]
  },
  description: {
    type: String,
    required: [true, "The description is required"]
  },
  backgroundColor: String,
  textColor: String,
  image: {
    type: String,
    required: [true, "The image is required"]
  },
  link: {
    type: String,
    required: [true, "The link is required"]
  },
  removed: Boolean,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", post);

export default Post;

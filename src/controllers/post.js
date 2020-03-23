import Post from "../models/post";
import NotFound from "../exceptions/notFound";

export const create = ({
  title,
  description,
  backgroundColor,
  textColor,
  image,
  link
}) => {
  const post = new Post({
    title,
    description,
    backgroundColor,
    textColor,
    image,
    link
  });

  return post.save();
};

export const list = () => {
  return Post.find({ removed: { $ne: true } }).sort("-createdAt");
};

export const update = (
  id,
  { title, description, backgroundColor, textColor, image, link }
) => {
  const post = {};

  if (title) post.title = title;
  if (description) post.description = description;
  if (backgroundColor) post.backgroundColor = backgroundColor;
  if (textColor) post.textColor = textColor;
  if (image) post.image = image;
  if (link) post.link = link;

  post.updatedAt = Date.now();
  return Post.findByIdAndUpdate(id, post);
};

export const remove = id => {
  return Post.findById(id).then(post => {
    if (post.removed) {
      throw NotFound();
    }
    return Post.findByIdAndUpdate(id, { removed: true });
  });
};

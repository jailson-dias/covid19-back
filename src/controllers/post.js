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

export const list = ({ page = 1, qtd = 10 }) => {
  return Post.find({ removed: { $ne: true } })
    .sort("-createdAt")
    .skip((page - 1) * qtd)
    .limit(page * qtd)
    .select("-__v");
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
  return Post.updateOne({ _id: id }, post).then(() =>
    Post.findById(id).select("-__v")
  );
};

export const remove = id => {
  return Post.findById(id).then(post => {
    if (post.removed) {
      throw NotFound();
    }
    return Post.updateOne({ _id: id }, { removed: true });
  });
};

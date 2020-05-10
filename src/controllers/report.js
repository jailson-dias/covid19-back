import Report from "../models/report";
import NotFound from "../exceptions/notFound";

export const create = ({
  postalCode,
  country,
  state,
  federativeUnit,
  city,
  neighborhood,
  street,
  latitude,
  longitude,
  age,
  gender,
  coronavirusState,
  relationshipPerson
}) => {
  const report = new Report({
    postalCode,
    country,
    state,
    federativeUnit,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
    age,
    gender,
    coronavirusState,
    relationshipPerson
  });

  return report.save();
};

export const myReports = ({ page = 1, qtd = 10 }) => {
  return Report.find({ removed: { $ne: true } })
    .sort("-createdAt")
    .skip((page - 1) * qtd)
    .limit(page * qtd)
    .select("-__v");
};

export const reportsByPostalCode = postalCode => {
  return Report.aggregate([
    { $match: { postalCode, removed: { $ne: true } } },
    { $group: { coronavirusState, cases: { $sum: 1 } } }
  ]);
  // .skip((page - 1) * qtd)
  // .limit(page * qtd)
  // .select("-__v");
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
  return Post.findById(id)
    .then(post => {
      if (post.removed) {
        throw new NotFound("Post not found");
      }
      return Post.updateOne({ _id: id }, post);
    })
    .then(() => Post.findById(id).select(["-__v", "-removed"]));
};

export const remove = id => {
  return Post.findById(id).then(post => {
    if (post.removed) {
      throw new NotFound("Post not found");
    }
    return Post.updateOne({ _id: id }, { removed: true });
  });
};

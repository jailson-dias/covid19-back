import Express from "express";
import * as postController from "../controllers/post";
import { responseGenerate } from "../utils/helpers";
import logger from "../utils/logger";
import NotFound from "../exceptions/notFound";

const router = Express.Router();

const validationErrors = errors => {
  const fields = Object.keys(errors);
  logger.info(`ValidationError on fields: ${fields.join(", ")}`);

  return fields.map(key => ({
    field: key,
    message: errors[key].message
  }));
};

const create = (req, res) => {
  postController
    .create(req.body)
    .then(post => {
      logger.info(`Post ${post.id} created successfully`);
      res.status(201).json(responseGenerate({ data: post }));
    })
    .catch(err => {
      let errors = {};
      let status = 500;

      if (err && err.name == "ValidationError") {
        status = 400;
        errors = validationErrors(err.errors);
      } else {
        errors = {
          message: "Unidentified error"
        };

        logger.error(`Unidentified error: ${err.stack}`);
      }
      res.status(status).json(responseGenerate({ message: errors }));
    });
};

const list = (req, res) => {
  postController
    .list(req.query)
    .then(posts => {
      logger.info(
        `Listing page ${req.query.page || 1} with ${
          posts.length
        } posts successfully`
      );
      res.status(200).json(responseGenerate({ data: posts }));
    })
    .catch(err => {
      let errors = {
        message: "Unidentified error"
      };
      let status = 500;

      logger.error(`Unidentified error: ${err.stack}`);
      res.status(status).json(responseGenerate({ message: errors }));
    });
};

const update = (req, res) => {
  postController
    .update(req.params.id, req.body)
    .then(post => {
      logger.info(`Post ${post.id} updated successfully`);
      res.status(200).json(responseGenerate({ data: post }));
    })
    .catch(err => {
      let errors = {};
      let status = 500;

      if (err && err.name == "ValidationError") {
        status = 400;
        errors = validationErrors(err.errors);
      } else if (err instanceof NotFound) {
        status = 404;
        errors = {
          message: "Post not found"
        };
      } else {
        errors = {
          message: "Unidentified error"
        };

        logger.error(`Unidentified error: ${err.stack}`);
      }
      res.status(status).json(responseGenerate({ message: errors }));
    });
};

const remove = (req, res) => {
  postController
    .remove(req.params.id)
    .then(post => {
      logger.info(`Post ${post.id} removed successfully`);
      res.status(200).json(
        responseGenerate({
          message: {
            message: "Successfully removed"
          }
        })
      );
    })
    .catch(err => {
      let errors = {};
      let status = 500;

      if (err instanceof NotFound) {
        status = 404;
        errors = {
          message: "Post not found"
        };
      } else {
        errors = {
          message: "Unidentified error"
        };

        logger.error(`Unidentified error: ${err.stack}`);
      }

      res.status(status).json(responseGenerate({ message: errors }));
    });
};

router.post("/post", create);
router.get("/posts", list);
router.put("/post/:id", update);
router.delete("/post/:id", remove);

export default router;

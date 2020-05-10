import Express from "express";
import reportController from "../controllers/report";
import { validationErrors } from "../utils/helpers";

const router = Express.Router();

const create = (req, res) => {
  logger.info("Creating a report...");

  reportController
    .create(req.body)
    .then(report => {
      logger.info(`Report ${report.id} created successfully`);
      res.status(201).json(responseGenerate({ data: report }));
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

const myReports = (req, res) => {
  logger.info("Getting my reports...");

  reportController
    .myReports()
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

const reportsByPostalCode = (req, res) => {
  logger.info("Getting my reports by postal code...");

  reportController
    .reportsByPostalCode(req.params.postalCode)
    .then(reports => {
      logger.info(`Retuning reports by postal code successfully`);
      res.status(200).json(responseGenerate({ data: reports }));
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

router.post("/", create);
router.get("/my", myReports);
router.get("/region/:postalCode", reportsByPostalCode);
router.put("/:id", edit);
router.delete("/:id", remove);

const create = (req, res, next) => {};

export default router;

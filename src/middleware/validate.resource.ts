import { AnyObjectSchema } from "yup";
import { Response, Request, NextFunction } from "express";

const validateResource =
  () =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    //   await resourceSchema.validate({
    //     body: req.body,
    //     query: req.query,
    //     params: req.params,
    //   });

      const { destination } = req.body;
      if (!destination) {
        return res.status(400).json({ error: "destination URL is required." });
      }

      const urlPattern =
        /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
      if (!urlPattern.test(destination)) {
        return res.status(400).json({ error: "Invalid original URL format." });
      }

      next();
    } catch (e) {
      res.send(e);
    }
  };

export default validateResource;

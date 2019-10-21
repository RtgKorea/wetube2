import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddCommnet
} from "../controllers/videoController";

const apiRouter = express();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addCommnet, postAddCommnet);

export default apiRouter;

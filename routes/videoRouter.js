import express from "express";
import routes from "../routes";
import {
  editVideo,
  deleteVideo,
  videoDetail,
  getUpload,
  postUpload
} from "../controllers/videoController";

const videoRouter = express();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;

import express from "express";
import routes from "../routes";
import {
  videos,
  upload,
  videosDetail,
  editVideo,
  deleteVideo
} from "../controllers/videoController";

const videoRouter = express();

videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videosDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;

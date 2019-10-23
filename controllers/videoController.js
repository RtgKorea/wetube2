import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  let videos = [];
  try {
    videos = await Video.find({}).sort({ _id: -1 });
  } catch (err) {
    console.log(`error : ${err}`);
  }
  res.render("home", { pageTitle: "Home", videos });
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (err) {
    console.log(err);
  }
  res.render("Search", { pageTitle: "Search", searchingBy, videos });
};
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location }
  } = req;
  // To do : upload & save Video
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: "ViewDetail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);

    if (video.creator != req.user.id) throw Error();
    else res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id }
  } = req;
  try {
    const video = await Video.findOneAndUpdate(
      { _id: id },
      { title, description }
    );
    console.log("TCL: postEditVideo -> video", video);
    if (video.creator != req.user.id) throw Error();

    res.redirect(routes.videoDetail(id));
  } catch (err) {
    console.log(err);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) throw Error();
    await Video.findOneAndRemove({ _id: id });
  } catch (err) {
    console.log(err);
  }
  res.redirect(routes.home);
};

// Register Video view
export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddCommnet = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (err) {
    console.log(err);
    res.status(400);
  } finally {
    res.end();
  }
};

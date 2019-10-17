//global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//user
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//video
const VIDOES = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Social login
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id => (id ? `/users/${id}` : USER_DETAIL),
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDOES,
  upload: UPLOAD,
  videoDetail: id => (id ? `/videos/${id}` : VIDEO_DETAIL),
  editVideo: id => (id ? `/videos/${id}/edit` : EDIT_VIDEO),
  deleteVideo: id => (id ? `/videos/${id}/delete` : DELETE_VIDEO),
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FB,
  facebookCallback: FB_CALLBACK
};

export default routes;

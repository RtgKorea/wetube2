import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("Join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (err) {
      console.log(err);
      res.redirect(reoutes.home);
      res.render("Join", { pageTitle: "Join" });
    }
  }
};
export const getLogin = (req, res) => {
  res.render("Login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const getGithubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, email, name }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (err) {
    return cb(err);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // logout
  req.logout();
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (_, __, profile, cb) => {
  const {
    _json: { id, name, mail }
  } = profile;
  console.log("TCL: facebookLoginCallback -> id, name, mail", id, name, mail);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  console.log(req.user);
  res.render("userDetail", { pageTtile: "User Detail", user: req.user });
};
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById({ _id: id }).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "userDetail", user });
  } catch (err) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "editProfile" });
export const postEditProfile = async (req, res) => {
  const {
    body: { email, name },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? `/${file.path}` : req.user.avatarUrl
    });
    res.redirect(routes.users + routes.me);
  } catch (err) {
    console.log(err);
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "changePassword" });
};
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 }
  } = req;
  try {
    if (newPassword !== newPassword2) {
      res.status(400);
      res.redirect(routes.users + routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.users + routes.me);
  } catch (err) {
    res.status(400);
    res.redirect(routes.users + routes.changePassword);
  }
};

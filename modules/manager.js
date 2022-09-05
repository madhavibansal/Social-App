const user = require("../models/user");
const posts = require("../models/posts");
const { signUpValidation, signInValidation } = require("../validation/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class Manager {
  signUp = async (requestData) => {
    const { error } = signUpValidation(requestData);
    if (error) return error.details[0].message;

    const emailExist = await user.findOne({ email: requestData.email });
    if (emailExist) return "Email is already exist";

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(requestData.password, salt);

    const User = new user({ ...requestData, password: hashedPass });

    const savedUser = await User.save();
    if (!savedUser) return "invalid request";
    return savedUser;
  };

  signIn = async (requestData) => {
    const { error } = signInValidation(requestData);
    if (error) return error.details[0].message;

    const users = await user.findOne({ email: requestData.email });
    if (!users) return "Email is not valid";

    const pass = await bcrypt.compare(requestData.password, users.password);
    if (!pass) return "Password is Incorrect";

    await user.findOneAndUpdate(
      { email: requestData.email },
      { isLogin: true },
      { upsert: false, new: true, setDefaultsOnInsert: true }
    );
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    return token;
  }

  getProfile = async (requestData) => {
    const findUser = await user.findOne({ _id: requestData.id });
    if (!findUser) return "not found user";
    return findUser;
  };

  updateProfile = async (requestData) => {
    const updateUser = await user.findOneAndUpdate(
      { _id: requestData._id },
      requestData,
      { upsert: false, new: true, setDefaultsOnInsert: true }
    );
    if (!updateUser) return "invalid request";
    return updateUser;
  };

  createPost = async (requestData) => {
    const postDetail = new posts(requestData);
    if (!postDetail) return "invalid request";
    return await postDetail.save();
  };

  getPost = async (requestData) => {
    const findPost = await posts.findOne({ _id: requestData.id });
    if (!findPost) return "not found user";
    return findPost;
  };

  updatePost = async (requestData) => {
    const updatePost = await posts.findOneAndUpdate(
      { _id: requestData.params._id },
      requestData.body,
      { upsert: false, new: true, setDefaultsOnInsert: true }
    );
    if (!updatePost) return "invalid request";
    return updatePost;
  };

  deletePost = async (requestData) => {
    const findPost = await posts.findByIdAndRemove({ _id: requestData._id });
    if (!findPost) return "not found user";
    return "deleted successfully";
  };

  searchPost = async ({ searchQuery }) => {
    const search = await posts.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { tag: { $regex: searchQuery, $options: "i" } },
      ],
    });
    if (!search) return "not found";
    return search;
  };

  getAllPost = async (requestData) => {
    if (requestData.id) return await posts.find({ createdBy: requestData.id });
    return await posts.find({});
  };

  likesCount = async (requestData) => {
    const postDetails = await posts.findOne({ _id: requestData.postId });
    if (!postDetails) return "not found post";
    let newLikes = postDetails.likes;
    let isLiked;
    if (newLikes.includes(requestData.id)) {
      let index = newLikes.indexOf(requestData.id);
      newLikes.splice(index, 1);
      isLiked = false;
    } else {
      newLikes.push(requestData.id);
      isLiked = true;
    }
    let updatePost = await posts.findOneAndUpdate(
      { _id: requestData.postId },
      { likes: newLikes,likeCount:newLikes.length },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (!updatePost) return "invalid request";
    return { ...updatePost._doc, isLiked };
  };

  commentPost = async (requestData) => {
    const postComment = await posts
      .findOneAndUpdate(
        { _id: requestData.postId },
        { $push: { ...requestData } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
      .populate({ path: "comments.commentedBy", select: ["name"] });
    if (!postComment) return "invalid request";
    return postComment;
  };

  sharePost = async (requestData) => {
    const findPost = await posts.findOne({ _id: requestData.postId });
    if (findPost.createdBy == requestData.userId)
      return "you can't share own post";
    else {
      const updateReshardPost = await posts.findByIdAndUpdate(
        { _id: findPost._id },
        { $push: { resharedBy: { userId: requestData.userId } } },
        { upsert: false, new: true, setDefaultsOnInsert: true }
      );
      if (!updateReshardPost) return "invalid request";
      return updateReshardPost;
    }
  };
}

module.exports = Manager;

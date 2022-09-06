const Module = require("../modules/index");
const { verify } = require("../jwtVerify/index");
const validationManager = require("../middleware/validation")
const route = (app) => {
  app.post("/signup", new Module().signUp);
  app.post("/signin", new Module().signIn);
  app.get("/get-profile/:id", verify,validationManager.getProfileValidation,new Module().getProfile);
  app.put("/update-profile",verify, validationManager.updateProfileValidation, new Module().updateProfile);
  app.post("/createpost",verify, validationManager.createPostValidation,new Module().createPost);
  app.get("/get-post/:id",verify,validationManager.getPostValidation,new Module().getPost);
  app.put("/updatepost/:_id",verify,validationManager.updatePostValidation ,new Module().updatePost);
  app.delete("/deletepost/:_id",verify, validationManager.deletePostValidation ,new Module().deletePost);
  app.get("/search-post",verify,validationManager.searchPostValidation ,new Module().searchPost);
  app.get("/getAllpost",verify,validationManager.getAllPostValidation,new Module().getAllPost);
  app.put("/likeCount",verify, validationManager.likePostValidation,new Module().likesCount);
  app.put("/commentpost",verify,validationManager.commentPostValidation, new Module().commentPost);
  app.put("/sharepost",verify,validationManager.sharePostValidation, new Module().sharePost);
};

module.exports = route;

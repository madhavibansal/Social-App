const Module = require("../modules/index");
const { auth } = require("../jwtVerify/index");
const validationManager = require("../middleware/validation")


const route = (app) => {
  app.post("/signUp",validationManager.signUpValidation,new Module().signUp);
  app.post("/signIn", validationManager.signInValidation,new Module().signIn);
  app.get("/getProfile/:id", auth,validationManager.getProfileValidation,new Module().getProfile);
  app.put("/updateProfile",auth, validationManager.updateProfileValidation, new Module().updateProfile);
  app.post("/createPost",auth, validationManager.createPostValidation,new Module().createPost);
  app.get("/getPost/:id",auth,validationManager.getPostValidation,new Module().getPost);
  app.put("/updatePost/:_id",auth,validationManager.updatePostValidation ,new Module().updatePost);
  app.delete("/deletePost/:_id",auth, validationManager.deletePostValidation ,new Module().deletePost);
  app.get("/searchPost",auth,validationManager.searchPostValidation ,new Module().searchPost);
  app.get("/getAllPost",auth,validationManager.getAllPostValidation,new Module().getAllPost);
  app.put("/likeCount",auth, validationManager.likePostValidation,new Module().likesCount);
  app.put("/commentPost",auth,validationManager.commentPostValidation, new Module().commentPost);
  app.put("/sharePost",auth,validationManager.sharePostValidation, new Module().sharePost);
};

module.exports = route;

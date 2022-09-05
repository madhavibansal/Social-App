const Module = require("../modules/index");
const { verify } = require("../jwtVerify/index");
const route = (app) => {
  app.post("/signup", new Module().signUp);
  app.post("/signin", new Module().signIn);
  app.get("/get-profile/:id", new Module().getProfile);
  app.put("/update-profile",  new Module().updateProfile);
  app.post("/createpost", new Module().createPost);
  app.get("/get-post/:id", new Module().getPost);
  app.put("/updatepost/:_id",  new Module().updatePost);
  app.delete("/deletepost/:_id",  new Module().deletePost);
  app.get("/search-post", new Module().searchPost);
  app.get("/getAllpost",new Module().getAllPost);
  app.put("/likeCount", new Module().likesCount);
  app.put("/commentpost", new Module().commentPost);
  app.put("/sharepost", new Module().sharePost);
};

module.exports = route;

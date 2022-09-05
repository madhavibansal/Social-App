const Manager = require("./manager");

class Index {
  async signUp(req, res) {
    const getsignUp = await new Manager().signUp(req.body);
    res.send(getsignUp);
  }
  async signIn(req, res) {
    const getsignIn = await new Manager().signIn(req.body);
    res.send(getsignIn);
  }
  async getProfile(req, res) {
    const getsprofile = await new Manager().getProfile(req.params);
    res.send(getsprofile);
  }
  async updateProfile(req, res) {
    const getUpdateprofile = await new Manager().updateProfile(req.body);
    res.send(getUpdateprofile);
  }
  async createPost(req, res) {
    const getcreatePost = await new Manager().createPost(req.body);
    res.send(getcreatePost);
  }
  async getPost(req, res) {
    const getPosts = await new Manager().getPost(req.params);
    res.send(getPosts);
  }
  async updatePost(req, res) {
    const getUpdatePost = await new Manager().updatePost(req);
    res.send(getUpdatePost);
  }
  async deletePost(req, res) {
    const getDeletePost = await new Manager().deletePost(req.params);
    res.send(getDeletePost);
  }
  async searchPost(req, res) {
    const getSearchPosts = await new Manager().searchPost(req.query);
    res.send(getSearchPosts);
  }
  async getAllPost(req, res) {
    const getAllPosts = await new Manager().getAllPost(req.query);
    res.send(getAllPosts);
  }

  async likePost(req, res) {
    const getlikePosts = await new Manager().likePost(req.body);
    res.send(getlikePosts);
  }

  async commentPost(req, res) {
    const getcommentPost = await new Manager().commentPost(req.body);
    res.send(getcommentPost);
  }

  async sharePost(req, res) {
    const getsharePost = await new Manager().sharePost(req.body);
    res.send(getsharePost);
  }
}

module.exports = Index;

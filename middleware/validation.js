const Handler = require("./handler")
const yup = require("yup")

module.exports = {

  signUpValidation: async (req, res, next) => {
    const schema = yup.object().shape({
      name: yup.string().min(6).required(),
      email: yup.string().required().email(),
      password: yup.string().min(8).required(),
    });
    await validate(schema, req.body, res, next);
},
signInValidation: async (req, res, next) => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(8).required(),
  });
  await validate(schema, req.body, res, next);
},

    getPostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          id:yup.string().required()
        });
        await validate(schema, req.params, res, next);
    },
    getProfileValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          id:yup.string().required()
        });
        await validate(schema, req.params, res, next);
    },
    updateProfileValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          _id:yup.string().required()
        });
        await validate(schema, req.body, res, next);
    },
    createPostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
            createdBy:yup.string().required(),
            creator:yup.string().required(),
            title:yup.string().required(),
            message:yup.string().required(),
            tag:yup.array().required(),
            image:yup.string().required()
        });
        await validate(schema, req.body, res, next);
    },
    updatePostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          _id:yup.string().required()
        });
        await validate(schema, req.params, res, next);
    },
    deletePostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          _id:yup.string().required()
        });
        await validate(schema, req.params, res, next);
    },
    searchPostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          type:yup.string().optional(),
          tag:yup.string().optional()
        });
        await validate(schema, req.query, res, next);
    },
    getAllPostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          id:yup.string().required()
        });
        await validate(schema, req.query, res, next);
    },
    likePostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          id:yup.string().required(),
          postId:yup.string().required()
        });
        await validate(schema, req.body, res, next);
    },
    commentPostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          postId:yup.string().required()
        });
        await validate(schema, req.body, res, next);
    },

    sharePostValidation: async (req, res, next) => {
        const schema = yup.object().shape({
          postId:yup.string().required(),
          userId:yup.string().required()
        });
        await validate(schema, req.body, res, next);
    },


};
const validate = async (schema, reqData, res, next) => {
    try {
      await schema.validate(reqData, { abortEarly: false });
      next();
    } catch (e) {
      const errors = e.inner.map(({ path, message, value }) => ({
        path,
        message,
        value,
      }));
      Handler.validationError(res, errors);
    }
  };
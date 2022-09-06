class Handler {
    static validationError(res,errorArray){
        Handler.response(
            res,
            errorArray,
            "Invalid Request!",
            "failure",
            "500"
            )
    }

    static response(res, data, message, success, code) {
        const responseObj = {
          responseData: data,
          message: message,
          success: success,
          responseCode: code,
        };
        res.format({
          json: () => {
            res.send(responseObj);
          },
        });
      }
}

module.exports = Handler
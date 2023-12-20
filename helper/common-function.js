require('dotenv').config();

function joiValidation(schema) {
  return (req, res, next) => {
    let isValid = true;
    Object.keys(schema).forEach((key) => {
      let { error } = schema[key].validate(req[key]);
      if (error) {
        isValid = false;
        const { details } = error;
        if (
          Array.isArray(details) &&
          details.length &&
          details[0].message
        ) {
          return res.status(422).json({
            status: 422,
            message: details[0].message,
            data: null,
            error:
              process.env.NODE_ENV !== "production"
                ? error && error.stack
                  ? error.stack
                  : null
                : null,
          });
        } else {
          return res.status(422).json({
            status: 422,
            message: "Invalid request " + key,
            data: null,
            error: null,
          });
        }
      }
    });
    if (isValid) {
      return next();
    }
  };
}


module.exports = {
  joiValidation
}

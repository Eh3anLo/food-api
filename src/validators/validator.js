function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        messages: result.error.issues.map((issue) => issue.message),
      });
    }

    req.body = result.data;

    next();
  };
}

module.exports = validate;

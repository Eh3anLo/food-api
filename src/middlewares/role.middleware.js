function authorize(...role) {
  // role => roles that have access

  return (req, res, next) => {
    const userRole = req.user.role;

    if (!role.includes(userRole)) {
      res.status(403).json({
        status: "دسترسی غیر مجاز",
        message: "شما دسترسی به این بخش ندارید",
      });
    }

    next();
  };
}

module.exports = { authorize }

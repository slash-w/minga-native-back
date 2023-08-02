function has_permission(req, res, next) {
  if (req.user.role === 1 || req.user.role === 2) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}
export default has_permission;

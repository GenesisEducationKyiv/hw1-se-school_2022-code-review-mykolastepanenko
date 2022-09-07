export function checkEmail(req, res, next) {
  const email = req.body.email;
  if (!email) {
    res.status(400).json("Email is required");
    return;
  }

  const reg =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const isValid = reg.test(email);
  if (!isValid) {
    res.status(400).json("Incorrect email");
    return;
  }
  next();
}

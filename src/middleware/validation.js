export function setDefaultHeader(req, res, next) {
  res.header("Content-Type", "application/json")
  next()
}

export function checkEmail(req, res, next) {
  const email = req.body.email;
  console.log(req.body)
  if (!email) {
    res.status(400).send("Email is required");
    return;
  }

  const reg =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const isValid = reg.test(email);
  if (!isValid) {
    res.status(400).send("Incorrect email");
    return;
  }
  next();
}

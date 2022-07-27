export function checkHeader(req, res, next) {
  // if (req.headers["content-type"] !== "application/json") {
  //   res.status(400).send("Not application/json header");
  //   return;
  // }
  // next();
  res.header("Content-Type", "application/json")
  next()
}

export function checkEmail(req, res, next) {
  const email = req.body.email;
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

import { RequestHandler } from "express";

export default <RequestHandler>((req, res) => {
  res.send({
    auth: req.session.auth
  })
})

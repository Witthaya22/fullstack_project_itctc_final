import { RequestHandler } from "express";

export default <RequestHandler>((req, res) => {
  res.send({
    admin: req.session.admin
  })
})

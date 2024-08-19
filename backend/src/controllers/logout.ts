import { RequestHandler } from "express";

export default <RequestHandler>((req, res) => {
  delete req.session.auth
  delete req.session.admin
  res.send({
    message: "ออกจากระบบสําเร็จ"
  })
})

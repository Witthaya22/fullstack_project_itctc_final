import { RequestHandler } from "express";
import prisma from "../prisma";
import { compare } from "bcrypt";
import { omit } from "lodash";
import { Admin } from "../generated/prisma-client-js";

declare module 'express-session' {
  export interface SessionData {
    admin?: Omit<Admin, 'password'>
  }
}


export default <RequestHandler>(async(req, res) => {
  const admin = await prisma.admin.findUnique({
    where: {
      username: req.body.username
    }
  })
  if(!admin) {
    return res.status(400).send({
      message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
    })
  }
  const result = await compare(req.body.password, admin.password)
  if(!result) {
    return res.status(400).send({
      message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
    })
  }
  req.session.admin = omit(admin, 'password')
  res.status(200).send({
    message: "ยินดีต้อนรับ",
  })
})

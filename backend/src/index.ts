import express, { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'
import router from './router'
import prisma from './prisma'
import { randomUUID } from 'crypto'
import ms from 'ms'


dotenv.config()
let redisClient = createClient()
redisClient.connect().catch(console.error)
const port = process.env.PORT ? +process.env.PORT : 4000


let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

async function startServer() {
  await prisma.$connect()

  const app = express()
  // \||||||||||||||||||||||||||||||||||||||||
  app.use(express.json())
  app.use(session({
    store: redisStore,
    secret: process.env.SECRET_KEY || randomUUID(),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: ms('7d'),
      httpOnly: true
    },
  }))
  app.use(router)

  app.use(<ErrorRequestHandler>((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  }))

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
startServer()

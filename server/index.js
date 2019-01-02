const Koa = require("koa")
var Router = require("koa-router")
var bodyParser = require("koa-bodyparser")
const fs = require("fs")
const mysql = require("./db")
let router = new Router()
const app = new Koa()
app.use(bodyParser())

app.use(router.routes()) // 添加路由中间件
app.use(router.allowedMethods()) // 对请求进行一些限制处理

router.post("/schedule/add", async (ctx, next) => {
  params = ctx.request.body

  let data = await mysql.scheduleAdd([
    params.name,
    params.color,
    params.repeatStatus
  ])
  ctx.body = {
    // data: data
    error: 1
  }
})

router.get("/schedule/list", async (ctx, next) => {
  let data = await mysql.scheduleList()
  ctx.body = {
    code: 200,
    data: data
  }
})

router.get("/schedule/info", async (ctx, next) => {
  params = ctx.request.query
  let data = await mysql.scheduleInfo(params.id)
  ctx.body = {
    code: 200,
    data: data
  }
})

router.post("/schedule/edit", async (ctx, next) => {
  params = ctx.request.body
  let data = await mysql.scheduleEdit([
    params.name,
    params.color,
    params.repeatStatus,
    params.id
  ])
  ctx.body = {
    code: 200,
    data: null
  }
})

router.get("/dailylife/list", async (ctx, next) => {
  let data = await mysql.dailyLifeList()
  ctx.body = {
    code: 200,
    data: data
  }
})
// 更新当天任务的状态
router.post("/dailylife/edit", async (ctx, next) => {
  let params = ctx.request.body
  let data = await mysql.dailyLifeEdit([
    params.status,
    params.finishTime ? new Date(params.finishTime) : null,
    params.sid
  ])
  ctx.body = {
    code: 200,
    data: null
  }
})

router.get("/dailylife/add", async (ctx, next) => {
  let data = await mysql.dailyLifeAdd()
})

app.listen(3002)

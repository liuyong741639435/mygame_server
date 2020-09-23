// 导入库
const express= require('express')
const http =require('http')
const scoketIo = require('socket.io')
const bodyParser = require('body-parser')
// 导入自定义模块
// 导入路由
const userRouter = require('./routers/user')
// 导入配置
const serverConfig = require('./config/server.config')

const app = express()
const httpServer = http.createServer(app)
const io = scoketIo(http)
httpServer.listen(serverConfig.port, ()=> console.log(`监听${serverConfig.port}`))


app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/user',userRouter)
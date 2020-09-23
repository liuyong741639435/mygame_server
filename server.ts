// 导入库
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const ws = require('ws')
// 导入自定义模块
const socketIo = require('./socket/index')
// 导入路由
const userRouter = require("./routers/user");
// 导入配置
const serverConfig = require("./config/server.config");

const app = express();
// 中间件
//  跨域
app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"], //指定接收的地址
    methods: ["GET", "POST"], //指定接收的请求类型
    alloweHeaders: ["Content-Type", "Authorization"], //指定header
  })
);
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);

const server = http.createServer(app);  //创建server


//  使用重新封装的ws的创建服务器
const wss = new ws.Server({port:9000}) //创建websocket服务
socketIo(wss);

const httpServer = http.createServer(app);


httpServer.listen(serverConfig.port, () =>
  console.log(`监听${serverConfig.port}`)
);



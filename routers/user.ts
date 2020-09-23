import express = require("express");
const { userLoginApi, userRegisterApi } = require("../model/api/userApi");
const jwt = require("../token/jwt");
const _Jwt = new jwt();
const userRouter = express.Router();
module.exports = userRouter; //导出路由

userRouter.get("/login", async function (req, res) {
  // 测试用get
  const uname = req.query.uname;
  const upwd = req.query.upwd;
  //  联调用post 
  // const uname = req.body.uname
  // const upwd = req.body.upwd
  console.log(`注册的账号：${uname}| 密码：${upwd}`);
  const formatRes:number = formatChecks({uname,upwd}) // 0 格式无错误  -1 为空  -2 格式不符合正则要求 
  //  正则校验
  switch(formatRes){
    case -1:
      return res.status(701).send({ code: -1, message: "账号密码不能为空" })
      break;
    case -2:
      return res.status(701).send({ code: -1, message: "账号密码不符合规则" })
      break;
  }

  userLoginApi({ uname, upwd })
    .then((ret) => {
      console.log(`ret:${ret}`);
      let token = _Jwt.generateToken(ret);
      res.send({code: 0, message: '登录成功', data: {token} });
    })
    .catch((err) => {
      if ((err = -1)) {
        res.status(701).send({ msg: "登录失败" }); //登录失败
      } else {
        console.log(`login:数据查询异常`);
        res.status(702).send({ msg: "login:数据查询异常" });
      }
    });
});

userRouter.get("/register", async function (req, res) {
  // 测试用get
  const uname = req.query.uname;
  const upwd = req.query.upwd;
  //  联调用post 
  // const uname = req.body.uname
  // const upwd = req.body.upwd
  console.log(`注册的账号：${uname}| 密码：${upwd}`);
  
  const formatRes:number = formatChecks({uname,upwd}) // 0 格式无错误  -1 为空  -2 格式不符合正则要求 
  
  switch(formatRes){
    case -1:
      return res.status(701).send({ code: -1, message: "账号密码不能为空" })
      break;
    case -2:
      return res.status(701).send({ code: -1, message: "账号密码不符合规则" })
      break;
  }

  userRegisterApi({ uname, upwd })
    .then((ret) => {
      console.log(`注册成功`);
      res.send({ code: 0, message: "注册成功" });
    })
    .catch((err) => {
      // console.log(err)
      return res.send({ code: -1, message: "注册失败" });
    });
});

// 登录 注册 格式认证
function formatChecks({uname, upwd}):number {
    //  非空认证
    if (!uname || !upwd) {
      console.log("账号密码不能为空");
      return -1
    }
    const _uname = uname.toString();
    const _upwd = upwd.toString();
  
    console.log(`注册的账号：${uname}| 密码：${upwd}`);
    const reg = /^([A-Z]|[a-z]|[0-9]){6,20}$/;
    if (!reg.test(_uname) || !reg.test(_upwd)) {
      console.log(`账号密码不符合规则：${reg.test(_uname)}|${reg.test(_upwd)}`);
      return -2
    } else {
      console.log("符合");
      return 0
    }
}

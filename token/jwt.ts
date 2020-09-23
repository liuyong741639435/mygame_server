const fs = require('fs')
const path = require('path')
const jsonWebToken = require('jsonwebtoken')

//  读取公钥私钥
let certPri = fs.readFileSync(path.join(__dirname, './pem/pri.key')) //私钥
let certPub = fs.readFileSync(path.join(__dirname, './pem/pub.key')) //公钥

module.exports = class jwt{
  constructor() {}
  public generateToken(data) {
    let created = Math.floor(Date.now())
    let token = jsonWebToken.sign({
      data,
      exp: created + 60 * 60 * 24 * 1000
    }, certPri, { algorithm: 'RS256' })
    return token
  }
  public verifyToken(token) {
    let res
    try {
      let result = jsonWebToken.verify(token,certPub,{algorithm: 'RS256'})
      let {exp = 0} = result
      let current =Math.floor(Date.now())
      if(exp>=current) {
        res = result.data || {}
      } else {
        res = -1
      }
    }
    catch(err){
      console.log(`校验errer:${err}`)
      res = 0
    }
  }
};

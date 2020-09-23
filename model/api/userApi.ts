import { resolve4 } from 'dns'
import pool = require('../pool')


const userLoginApi = ({uname,upwd}) =>{
    return new Promise((resolve,reject)=>{
      const sql = 'SELECT uid FROM user WHERE uname=? AND upwd=MD5(?)'
      pool.query(sql,[uname,upwd],async function(err,result){
        if(err) reject(err)
        if(result.length==0){
          reject(-1)
        } else {
          resolve(result[0])
        }
      })
    })
  }

const userRegisterApi =({uname,upwd}) =>{
  return new Promise((resolve,reject)=>{
    const sql = 'INSERT INTO user (uid,uname,upwd) VALUES (?,?,MD5(?))'
    const uid = Math.floor(Math.random()*1000000)+100000

    pool.query(sql,[uid,uname,upwd],async function(err,result){
      if(err) reject(err)
      if(result.affectedRows==1) {
        resolve()
      } else {
        reject(err)
      }
    })
  })
}
module.exports = {userLoginApi, userRegisterApi}


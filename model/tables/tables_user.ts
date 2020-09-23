//  初始化创建表

module.exports = pool => {
  //  创建user
  pool.query(
    `create table if not exists user(
      \`id\` INT NOT NULL AUTO_INCREMENT UNIQUE,
      \`uid\` INT NOT NULL UNIQUE,
      \`uname\` VARCHAR(45) NOT NULL UNIQUE,
      \`upwd\` VARCHAR(32) NOT NULL,
      PRIMARY KEY (\`ID\`)
    )`,
    function(err,res){
      if(err) throw err
      // console.log(`创建成功`)
      // console.log(res)
    }
  )
  //  创建其他表
}
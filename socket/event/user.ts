module.exports = {
  login(content,socket) {
    console.log(`收到的数据为：${content}`)
    const res = {event:"login", 'content':{
      code: 1,
      msg: '登录成功',
      data: {
        token: '123sdad122313dada'
      }
    }}
    // 发送的内容 必须是string

    socket.send(
      JSON.stringify(res)
    )
  }
}
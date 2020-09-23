const user = require('./event/user')
let mark = 0;

export = (wss) => {
  wss.on("connection", function (socket) {
    console.log(`第${++mark}位用户连接进来`);
    socket.on('message',function(message){
      message = JSON.parse(message)
      console.log('message', message);
      const event = message['event'] // login 
      const content = message['content']
      //  基本事件格式过滤
      if(!event) {
        const res = {code: -1, event, content}
        console.log(res)
        socket.send(res)
        return //
      }
      // 事件绑定
      if(!user[event]) return console.log(`不存在${event}事件`)
      user[event](content,socket)
    })
  });
};

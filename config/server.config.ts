const devServerConfig = {
<<<<<<< HEAD
  port: 8000
}

const prodServerConfig = {
  port: 8000
=======
  port: 80
}

const prodServerConfig = {
  port: 80
>>>>>>> 24e4bb7040848e5b0f5fdb8fa1fe3fdc3d4258f5
}

module.exports = process.env.NODE_ENV === 'development' ? devServerConfig : prodServerConfig
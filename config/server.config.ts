const devServerConfig = {
  port: 80
}

const prodServerConfig = {
  port: 80
}

module.exports = process.env.NODE_ENV === 'development' ? devServerConfig : prodServerConfig
const devServerConfig = {
  port: 8000
}

const prodServerConfig = {
  port: 8000
}

module.exports = process.env.NODE_ENV === 'development' ? devServerConfig : prodServerConfig
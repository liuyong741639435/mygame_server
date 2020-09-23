const devSqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ts',
  connectionLimit:'10'
}

const prodSqlConfig = {
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'ts'
}

module.exports = process.env.NODE_ENV === 'development' ? devSqlConfig : prodSqlConfig
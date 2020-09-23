const mysql = require('mysql')
const mysqlConfig = require('../config/mysql.config')

const pool = mysql.createPool(mysqlConfig)

// 创建user表
require('./tables/tables_user')(pool)
export = pool
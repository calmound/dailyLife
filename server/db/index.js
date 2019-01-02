const mysql = require("mysql")
// const config = {
//   host: "127.0.0.1",
//   user: "root",
//   password: "Root123456",
//   database: "dailyLife",
//   port: 3306,
//   multipleStatements: true //允许多条sql同时执行
// }
const config = {
  host: "173.254.213.14",
  user: "muziwutk_root",
  password: "RootRoot123456",
  database: "dailyLife",
  port: 3306,
  multipleStatements: true //允许多条sql同时执行
}

const pool = mysql.createPool(config)

class Mysql {
  constructor() {}
  query(sql, value) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) console.log(err)
        connection.query(sql, value, (err, results, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
          connection.release()
        })
      })
    })
  }
  scheduleAdd(value) {
    let _sql = "insert into schedule set name=?,color=?,repeatStatus=?"
    return this.query(_sql, value)
  }
  scheduleEdit(value) {
    let _sql = "update schedule set name=?,color=?,repeatStatus=? where id=?"
    return this.query(_sql, value)
  }
  scheduleList() {
    let _sql = "select * from schedule"
    return this.query(_sql, "")
  }
  scheduleInfo(value) {
    let _sql = `select * from schedule where id=${value}`
    return this.query(_sql, value)
  }
  dailyLifeList() {
    let _sql =
      "select * from schedule s LEFT JOIN dailylife_list d on s.id=d.id where to_days(d.date) = to_days(now())"
    return this.query(_sql, "")
  }
  dailyLifeAdd() {
    //生成当天任务 当天日期，完成状态 任务持续时间，额外说明，完成时间，读书任务的话看了多少页，作品地址
    let _sql = `insert into dailylife_list(id,date) select id,NOW() from schedule`
    return this.query(_sql, "")
  }
  dailyLifeEdit(value) {
    let _sql = "update dailylife_list SET status=?,finishTime=? where sid=?"
    return this.query(_sql, value)
  }
}

module.exports = new Mysql()

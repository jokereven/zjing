package mysql

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql" // 匿名引入mysql驱动
	"github.com/jmoiron/sqlx"
	"github.com/jokereven/zjing/setting"
	"go.uber.org/zap"
)

// 声明一个全局的db对象
var db *sqlx.DB

// Init ... 初始化MySQL
func Init(mysql *setting.MySQLConfig) (err error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True",
		mysql.User,
		mysql.Password,
		mysql.Host,
		mysql.Port,
		mysql.DBname)
	// 也可以使用MustConnect连接不成功就panic
	db, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		zap.L().Error("connect DB failed, err:%v\n", zap.Error(err))
		return
	}
	db.SetMaxOpenConns(mysql.MaxOpenConns)
	db.SetMaxIdleConns(mysql.MaxIdleConns)
	return
}

// Close the connection
func Close() {
	_ = db.Close()
}

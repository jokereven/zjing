package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jokereven/zjing/dao/mysql"
	"github.com/jokereven/zjing/dao/redis"
	"github.com/jokereven/zjing/logger"
	"github.com/jokereven/zjing/route"
	"github.com/jokereven/zjing/setting"

	"github.com/spf13/viper"
	"go.uber.org/zap"
)

func main() {
	// 执行命令行

	// 1. 通过os.Args 执行命令行
	/* 	if len(os.Args) < 2 {
		fmt.Println("need set config file such: zjing.exe ./conf/config.yaml")
		return
	} */

	// 2. 通过flag 执行命令行
	var filepath string
	func() {
		flag.StringVar(&filepath, "f", "./conf/config.yaml", "配置文件")
		flag.Parse()
	}()

	// 初始化配置
	if err := setting.Init(filepath); err != nil {
		fmt.Printf("settings.Init failed err:%v\n", err)
		return
	}

	// 2. 初始化日志
	if err := logger.Init(setting.Conf.LogConfig, viper.GetString("app.mode")); err != nil {
		fmt.Printf("logger.Init failed err:%v\n", err)
		return
	}
	defer zap.L().Sync()
	zap.L().Debug("logger init success...")

	// 3. 初始化MySQL连接
	if err := mysql.Init(setting.Conf.MySQLConfig); err != nil {
		fmt.Printf("mysql.Init failed:%v\n", err)
		return
	}
	defer mysql.Close()

	// 4. 初始化Redis连接
	if err := redis.Init(setting.Conf.RedisConfig); err != nil {
		fmt.Printf("redis.Init failed:%v\n", err)
		return
	}
	defer redis.Close()

	// 5. 注册路由
	r := route.Setup(viper.GetString("app.mode"))

	// 6. 启动服务(优雅关机)
	srv := &http.Server{
		Addr:    fmt.Sprintf("%s:%d", viper.GetString("app.host"), viper.GetInt("app.port")),
		Handler: r,
	}

	fmt.Println(fmt.Sprintf("server listening on %d", viper.GetInt("app.port")))

	go func() {
		// 开启一个goroutine启动服务
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// 等待中断信号来优雅地关闭服务器，为关闭服务器操作设置一个5秒的超时
	quit := make(chan os.Signal, 1) // 创建一个接收信号的通道
	// kill 默认会发送 syscall.SIGTERM 信号
	// kill -2 发送 syscall.SIGINT 信号，我们常用的Ctrl+C就是触发系统SIGINT信号
	// kill -9 发送 syscall.SIGKILL 信号，但是不能被捕获，所以不需要添加它
	// signal.Notify把收到的 syscall.SIGINT或syscall.SIGTERM 信号转发给quit
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM) // 此处不会阻塞
	<-quit                                               // 阻塞在此，当接收到上述两种信号时才会往下执行
	zap.L().Info("Shutdown Server ...")
	// 创建一个5秒超时的context
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	// 5秒内优雅关闭服务（将未处理完的请求处理完再关闭服务），超过5秒就超时退出
	if err := srv.Shutdown(ctx); err != nil {
		zap.L().Fatal("Server Shutdown: ", zap.Error(err))
	}

	zap.L().Info("Server exiting")
}

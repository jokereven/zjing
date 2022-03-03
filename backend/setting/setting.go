package setting

import (
	"fmt"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

// 使用结构体变量保存结构体信息

// Conf ... 全局变量, 用来保存程序的所有配置信息
var Conf = new(AppConfig)

// AppConfig ...
type AppConfig struct {
	Name      string `mapstructure:"name"`
	Mode      string `mapstructure:"mode"`
	Host      string `mapstructure:"host"`
	Version   string `mapstructure:"version"`
	Port      int    `mapstructure:"port"`
	StartTime string `mapstructure:"start_time"`
	MachineID int    `mapstructure:"machine_id"`

	*LogConfig   `mapstructure:"log"`
	*MySQLConfig `mapstructure:"mysql"`
	*RedisConfig `mapstructure:"redis"`
}

// LogConfig ...
type LogConfig struct {
	Level      string `mapstructure:"level"`
	Filename   string `mapstructure:"file_name"`
	MaxSize    int    `mapstructure:"max_size"`
	MaxAge     int    `mapstructure:"max_age"`
	MaxBackups int    `mapstructure:"max_backups"`
}

// MySQLConfig ...
type MySQLConfig struct {
	Host         string `mapstructure:"host"`
	Port         int    `mapstructure:"port"`
	User         string `mapstructure:"user"`
	Password     string `mapstructure:"password"`
	DBname       string `mapstructure:"db_name"`
	MaxOpenConns int    `mapstructure:"max_open_conns"`
	MaxIdleConns int    `mapstructure:"max_idle_conns"`
}

// RedisConfig ...
type RedisConfig struct {
	Host     string `mapstructure:"host"`
	Port     int    `mapstructure:"port"`
	DB       int    `mapstructure:"db"`
	Password string `mapstructure:"password"`
	PoolSize int    `mapstructure:"pool_size"`
}

// Init ... 初始化配置
// 使用viper管理配置
func Init(filepath string) error {
	// 设置配置文件
	// 配置文件相对于可以执行文件的位置(即main.go的位置)
	// viper.SetConfigFile("./conf/config.yaml")
	viper.SetConfigFile(filepath)

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil { //读取配置文件失败
		fmt.Printf("viper.ReadInConfig() failed, err:%v\n", err)
		return err
	}

	// 把读取到的配置信息反序列化到Conf变量中
	if err := viper.Unmarshal(Conf); err != nil { //反序列化失败
		fmt.Printf("viper.Unmarshal() failed, err:%v\n", err)
		return err
	}

	// 监听配置文件
	viper.WatchConfig()
	viper.OnConfigChange(func(in fsnotify.Event) {
		fmt.Printf("Config file changed:%v\n", in.Name)
		if err := viper.Unmarshal(Conf); err != nil { // 把变化后的配置文件重新反序列化到Conf变量中
			fmt.Printf("viper.Unmarshal() failed again, err:%v\n", err)
			return
		}
	})

	return nil
}

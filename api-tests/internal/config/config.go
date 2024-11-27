package config

import (
    "github.com/spf13/viper"
    "github.com/nikolarss0n/suse-qa-challenge/api-tests/internal/logger"
    "path/filepath"
    "sync"
)

type Config struct {
    BaseURL  string
    Username string
    Password string
}

var (
    cfg  *Config
    once sync.Once
)

func GetConfig() *Config {
    once.Do(func() {
        viper.SetConfigName("config")
        viper.SetConfigType("yml")

        projectRoot, err := filepath.Abs("..")
        if err != nil {
            panic("Failed to determine project root: " + err.Error())
        }
        viper.AddConfigPath(projectRoot)
        viper.AddConfigPath(".")

        log := logger.GetLogger()
        log.Info("Project root: " + projectRoot)

        // Remove or comment out this line to prevent environment variables from overriding config values
        // viper.AutomaticEnv()

        err = viper.ReadInConfig()
        if err != nil {
            panic("Failed to read configuration: " + err.Error())
        }

        log.Info("Config file used: " + viper.ConfigFileUsed())
        log.Info("Raw username: " + viper.GetString("username"))
        log.Infof("Raw config: %v", viper.AllSettings())

        cfg = &Config{
            BaseURL:  viper.GetString("base_url"),
            Username: viper.GetString("username"),
            Password: viper.GetString("password"),
        }
    })
    return cfg
}

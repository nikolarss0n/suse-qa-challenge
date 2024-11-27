package logger

import (
    "github.com/sirupsen/logrus"
    "os"
    "sync"
)

var (
    log  *logrus.Logger
    once sync.Once
)

// GetLogger returns a singleton logger instance.
func GetLogger() *logrus.Logger {
    once.Do(func() {
        log = logrus.New()
        log.Out = os.Stdout
        log.SetLevel(logrus.InfoLevel)
        log.SetFormatter(&logrus.JSONFormatter{})
    })
    return log
}

package api

import (
    "context"
    "fmt"
    "net/http"

    "github.com/nikolarss0n/suse-qa-challenge/api-tests/internal/logger"
)

const loginEndpoint = "/v3"

// Login authenticates the user and retrieves an API token.
func (c *APIClient) Login(ctx context.Context, accessKey, secretKey string) error {
    log := logger.GetLogger()
    url := c.BaseURL + loginEndpoint

    log.Info("Attempting login with access key: " + accessKey)
    
    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil {
        return fmt.Errorf("failed to create login request: %w", err)
    }

    req.SetBasicAuth(accessKey, secretKey)
    log.Info("Auth header: " + req.Header.Get("Authorization"))

    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return fmt.Errorf("login request failed: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        log.Error("Login failed with status: " + resp.Status)
        return fmt.Errorf("login failed with status: %s", resp.Status)
    }

    c.Token = req.Header.Get("Authorization")
    return nil
}
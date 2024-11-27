package api

import (
    "net/http"
    "time"
    "crypto/tls"
)

// HTTPClient interface for mocking in tests.
type HTTPClient interface {
    Do(req *http.Request) (*http.Response, error)
}

// APIClient handles communication with the Rancher API.
type APIClient struct {
    BaseURL    string
    HTTPClient HTTPClient
    Token      string
}

// NewClient creates a new APIClient instance.
// skipTLSVerify indicates whether to skip TLS certificate verification.
func NewClient(baseURL string, skipTLSVerify bool) *APIClient {
    transport := &http.Transport{
        TLSClientConfig: &tls.Config{InsecureSkipVerify: skipTLSVerify},
    }
    httpClient := &http.Client{
        Timeout:   30 * time.Second,
        Transport: transport,
    }
    return &APIClient{
        BaseURL:    baseURL,
        HTTPClient: httpClient,
    }
}

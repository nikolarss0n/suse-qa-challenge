package api

// LoginResponse represents the response from the Rancher login API.
type LoginResponse struct {
    Token string `json:"token"`
}

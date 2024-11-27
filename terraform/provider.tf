provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone

  # Use the GitHub Actions public key for authentication
  access_token = file("github_actions_key.pub")
}
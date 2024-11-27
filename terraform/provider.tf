provider "google" {
  credentials = null # Use null since GOOGLE_CREDENTIALS env variable will be used
  project     = var.project
  region      = var.region
}

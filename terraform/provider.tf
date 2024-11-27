provider "google" {
  credentials = var.credentials_file != "" ? file(var.credentials_file) : null
  project     = var.project
  region      = var.region
}

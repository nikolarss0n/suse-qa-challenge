variable "project" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP zone"
  type        = string
  default     = "us-central1-a"
}

variable "machine_type" {
  description = "Machine type for the VM"
  type        = string
  default     = "e2-medium"
}

variable "image_family" {
  description = "Image family to use for the VM"
  type        = string
  default     = "ubuntu-2004-lts"  # Changed to Ubuntu for better Docker support
}

variable "image_project" {
  description = "Image project to use for the VM"
  type        = string
  default     = "ubuntu-os-cloud"  # Changed to Ubuntu project
}

variable "network" {
  description = "VPC network name"
  type        = string
  default     = "default"
}

variable "subnetwork" {
  description = "Subnetwork name"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Network tags for the VM"
  type        = list(string)
  default     = ["http-server", "https-server"]  # Added default tags for Rancher access
}

variable "ssh_public_key" {
  description = "SSH public key for VM access"
  type        = string
  default     = ""  # Will be populated from GitHub Actions
}
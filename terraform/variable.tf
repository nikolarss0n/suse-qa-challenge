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
  default     = "debian-11"
}

variable "image_project" {
  description = "Image project to use for the VM"
  type        = string
  default     = "debian-cloud"
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
  default     = []
}
output "instance_ip" {
  description = "The public IP address of the instance"
  value       = trim(google_compute_instance.default.network_interface[0].access_config[0].nat_ip, " ")
  sensitive   = false
}

output "instance_name" {
  description = "The name of the instance"
  value       = google_compute_instance.default.name
}
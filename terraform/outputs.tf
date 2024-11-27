output "instance_ip" {
  description = "The public IP address of the VM."
  value       = google_compute_instance.default.network_interface[0].access_config[0].nat_ip
}

output "instance_name" {
  description = "The name of the VM instance."
  value       = google_compute_instance.default.name
}

resource "google_compute_instance" "default" {
  name         = "test-vm"
  machine_type = var.machine_type
  zone         = var.zone

  tags = var.tags

  boot_disk {
    initialize_params {
      image = "${var.image_project}/${var.image_family}"
    }
  }

  network_interface {
    network    = var.network
    subnetwork = var.subnetwork != "" ? var.subnetwork : null

    access_config {
      # Ephemeral IP
    }
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    echo "Hello, World!" > /var/www/html/index.html
  EOT

  metadata = {
    ssh-keys = "ubuntu:${file("${path.module}/github_actions_key.pub")}"
  }

  service_account {
    email  = "terraform-deployer@${var.project}.iam.gserviceaccount.com"
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}

output "instance_ip" {
  description = "The public IP address of the VM."
  value       = google_compute_instance.default.network_interface[0].access_config[0].nat_ip
}

output "instance_name" {
  description = "The name of the VM instance."
  value       = google_compute_instance.default.name
}
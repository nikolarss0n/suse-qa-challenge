resource "google_compute_instance" "default" {
  name         = "test-vm-${formatdate("YYYYMMDD-HHmmss", timestamp())}"  # Added timestamp to make name unique
  machine_type = var.machine_type
  zone         = var.zone
  tags         = var.tags

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
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
  EOT

  metadata = {
    ssh-keys = "ubuntu:${var.ssh_public_key}"
  }

  service_account {
    email  = "terraform-admin-sa@${var.project}.iam.gserviceaccount.com"
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}
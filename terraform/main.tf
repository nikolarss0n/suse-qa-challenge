# Firewall rule for Rancher
resource "google_compute_firewall" "rancher" {
  name    = "allow-rancher-${formatdate("YYYYMMDD-HHmmss", timestamp())}"  # Add timestamp
  network = var.network

  allow {
    protocol = "tcp"
    ports    = ["8443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["rancher"]
}

# VM Instance
resource "google_compute_instance" "default" {
  name         = "test-vm-${formatdate("YYYYMMDD-HHmmss", timestamp())}"
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
    docker run -d --restart=unless-stopped \
      --privileged \
      -p 8443:8443 \
      -e CATTLE_BOOTSTRAP_PASSWORD=adminpassword \
      -e CATTLE_SERVER_URL="https://\$(curl -s http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip -H 'Metadata-Flavor: Google'):8443" \
      rancher/rancher:latest
  EOT

  metadata = {
    ssh-keys = "ubuntu:${var.ssh_public_key}"
  }

  service_account {
    email  = "terraform-admin-sa@${var.project}.iam.gserviceaccount.com"
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}
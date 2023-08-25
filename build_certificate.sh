#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <domain name>"
    exit 1
fi

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (use sudo)"
   exit 1
fi

mkdir -p "certificates"

domain_name="$1"
key_file="certificates/key.pem"
cert_file="certificates/cert.pem"

mkcert -key-file $key_file -cert-file $cert_file $domain_name
echo "Certificate and key successfully created"

# Check if the entry already exists in the hosts file
if grep -q "$domain_name" /etc/hosts; then
    echo "Entry for $domain_name already exists in /etc/hosts"
else
    # Append the entry to the hosts file
    echo -e "\n127.0.0.1 $domain_name #local-https-server" >> /etc/hosts
    echo "Added $domain_name to /etc/hosts"
fi

#!/bin/bash

echo "Installing ps (procps), curl, bash..."
dnf install -y procps-ng curl bash --allowerasing

echo "Installing unzip..."
dnf install -y unzip

echo "Installing pm2 (requires build tools)..."
dnf groupinstall -y "Development Tools"
dnf install -y gcc-c++ make python3

# Install Node.js & npm if not already present
if ! command -v node &> /dev/null; then
    # Reset and enable the desired module stream
    dnf module reset -y nodejs
fi

echo "Installing Node.js v$NODE_VER..."    
dnf module enable -y nodejs:"$NODE_VER"    
# Install Node.js and npm
dnf install -y nodejs npm

# Install pm2 and node-gyp
npm i -g npm node-gyp pm2

# Install Bun (requires $BUN_VER to be set)
if [ ! -d "/opt/bun" ]; then
    echo "Installing Bun in /opt/bun..."
    curl -fsSl https://bun.sh/install | bash -s "bun-$BUN_VER"
    mv "$HOME/.bun" /opt/bun
    chmod -R 755 /opt/bun
    ln -s /opt/bun/bin/bun /usr/bin/bun
fi

# Install OpenSSL (for nuxt-auth-utils or others)
dnf install -y openssl

# Optional cleanup to reduce image size (comment this out if tools are still needed)
echo "Cleaning up..."
dnf remove -y unzip gcc-c++ make
dnf autoremove -y

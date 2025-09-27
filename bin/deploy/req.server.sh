#!/bin/sh

echo "installing ps"
apk add --no-cache procps-ng curl bash
echo "installing bun -> /opt/bun"
apk add --no-cache unzip
if [ ! -d "/opt/bun" ]; then
    echo "Installing Bun in /opt/bun..."
    curl -fsSl https://bun.sh/install | bash -s "bun-$BUN_VER"
    mv "$HOME/.bun" /opt/bun
    chmod -R 755 /opt/bun
    ln -s /opt/bun/bin/bun /usr/bin/bun
fi
echo "installing pm2"
apk add --no-cache build-base make
npm i -g npm
npm i -g pm2

apk del unzip build-base make curl bash

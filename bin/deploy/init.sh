#!/bin/bash

BIN_DIR="$(dirname "$(realpath "$0")")"
ROOT="$BIN_DIR/../.."
source "$ROOT/.env"
source "$ROOT/$PRES_ENV"

echo "install project"

make uninstall

mkdir -p "/var/www/$APP_PRES_ROOT"
APP_PRES_SHADOW="/var/www/$APP_PRES_ROOT" make runBuild

echo "project installed"

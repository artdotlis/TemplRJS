#!/bin/bash

ROOT=$(dirname "$(realpath "$0")")
source "$ROOT/../.env"
source "$ROOT/../$PRES_ENV"

echo "prepare step"
/bin/bash "$ROOT/deploy/prep.sh"
echo -e "---\ninstalling requirements"
/bin/bash "$ROOT/deploy/req.sh"
echo -e "---\npreparing for package installation"
/bin/bash "$ROOT/deploy/fix.sh"
echo -e "---\ninstalling package"
/bin/bash "$ROOT/deploy/init.sh"
echo "---"

#!/bin/bash
set -e

ROOT=$(dirname "$(realpath "$0")")
source "$ROOT/../../.env"

CMD="$1"
shift

FULL_CMD="$CMD $*"
eval "$FULL_CMD"
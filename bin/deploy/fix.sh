#!/bin/bash

ROOT="$(dirname "$(realpath "$0")")/../.."
source "$ROOT/.env"
source "$ROOT/$PRES_ENV"

echo "create empty revealjs config"
mkdir -p "$(dirname "$ROOT/$CONFIG_REVEALJS")"
if [ ! -f "$ROOT/$CONFIG_REVEALJS" ]; then
    cat "$ROOT/$TEMPL_CONFIG_REVEALJS" >"$ROOT/$CONFIG_REVEALJS"
fi

echo "create empty deck config"
if [ ! -f "$ROOT/$CONFIG_DECK" ]; then
    cat "$ROOT/$TEMPL_CONFIG_DECK" >"$ROOT/$CONFIG_DECK"
fi

echo "preparation finished"

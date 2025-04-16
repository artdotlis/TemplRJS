#!/bin/sh

echo "starting server - in /var/www/$APP_PRES_ROOT"
cd "/var/www/$APP_PRES_ROOT" || exit 1

for cnt in $(seq 0 $((PM2_WORKER - 1))); do
    NODE_ENV=production PORT="$((NODE_PORT + cnt))" \
        pm2 start --interpreter bun serve --directory "$APP_PRES_PUB_ROOT" -n "server-$cnt"
done

pm2 logs

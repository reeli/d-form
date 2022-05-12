#!/bin/sh

set -e

envsubst "\$APP_CONFIG" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"

exec "$@"

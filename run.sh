#!/bin/bash
set -x -e
envsubst < /supervisord.conf.template > /etc/supervisor/conf.d/supervisord.conf
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf & node -v && cat index.js && sleep 2s && node index.js
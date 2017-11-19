#!/bin/bash

if [ $URL != "**None**" ]; then
  perl -p -i -e 's#http://petstore.swagger.io/v2/swagger.json#$ENV{URL}#' /usr/share/nginx/html/index.html
fi

exec nginx -g 'daemon off;'

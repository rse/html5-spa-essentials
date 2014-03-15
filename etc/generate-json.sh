#!/bin/sh
if [ ! -d node_modules ]; then
    npm install lodash sprintfjs
fi
node generate-json.js

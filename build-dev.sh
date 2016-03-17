#!/bin/sh
rm -rf dist/*
cp -R styles dist/styles
cp -R assets dist/assets
cp index.html dist
cp authSuccess.html dist
cp .nojekyll dist
webpack --config webpack.config.dev.js --watch

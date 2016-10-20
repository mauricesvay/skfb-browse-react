#!/bin/sh
rm -rf docs/*
cp -R styles docs/styles
cp -R assets docs/assets
cp index.html docs
cp authSuccess.html docs
cp .nojekyll docs
webpack --config webpack.config.dev.js --watch

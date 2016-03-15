#!/bin/sh
rm -rf dist/*
cp -R styles dist/styles
cp -R assets dist/assets
cp index.html dist
cp .nojekyll dist
webpack -p

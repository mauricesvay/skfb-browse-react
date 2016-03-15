#!/bin/sh
./build
git add --all dist
git commit -m "Updates dist build"
git subtree push --prefix dist origin gh-pages

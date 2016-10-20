#!/bin/sh
./build.sh
git add --all docs
git commit -m "Updates dist build"
git push origin master

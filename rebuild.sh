#!/bin/bash
set -e
rm -rf node_modules
rm -rf dist/*
ant
unzip dist/com.ti.camera.pro-android-0.6.zip
rm -rf example/modules
mv modules example
cd example
#ti build -p android -C ?
ti build -p android -T device -C ?
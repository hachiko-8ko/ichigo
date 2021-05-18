#!/bin/bash

uglifyjs  --compress --mangle 'reserved=[Component,BoundComponent]' --output dist/mi5-component.min.js dist/mi5-component.js
uglifyjs  --compress --mangle --output dist/mi5-extension.min.js dist/mi5-extension.js
uglifyjs  --compress --mangle --output dist/mi5-keyword.min.js dist/mi5-keyword.js
uglifyjs  --compress --mangle --output dist/mi5-observable.min.js dist/mi5-observable.js
uglifyjs  --compress --mangle --output dist/mi5-promise.min.js dist/mi5-promise.js
uglifyjs  --compress --mangle --output dist/mi5-router.min.js dist/mi5-router.js
uglifyjs  --compress --mangle --output dist/mi5-util.min.js dist/mi5-util.js
uglifyjs  --compress --mangle 'reserved=[Component,BoundComponent]' --output dist/ichigo-full.min.js dist/ichigo-full.js
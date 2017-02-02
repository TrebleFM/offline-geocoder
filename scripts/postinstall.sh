#!/bin/bash

npm run generate

# Cleanup useless extra files
mv db.sqlite ..
rm *
mv ../db.sqlite .

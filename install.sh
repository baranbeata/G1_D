#!/bin/bash

sudo apt update

sudo apt install maven

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt install nodejs

cd security-frontend
npm install

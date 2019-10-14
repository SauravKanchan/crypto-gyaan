# Crypto Gyaan
[![Build Status](https://travis-ci.com/SauravKanchan/crypto-gyaan.svg?token=2yjAythLGDwdY1XXtyDa&branch=master)](https://travis-ci.com/SauravKanchan/crypto-gyaan)

A dapp where users can come and list NFTs(gyaan) that they have for sale and other users can come and purchase them for ETH.

## Installation
```shell script
git clone https://github.com/SauravKanchan/crypto-gyaan.git
npm i
npm run dev
```

For production mode
```shell script
npm run build
cp public/css/bootstrap.min.css dist/css/
```

If changes are made in the smart contract then it should be compiled and deployed again
```shell script
node compile.js
node deploy.js
```
Note: Check config.json for project configuration.    
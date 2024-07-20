#!/bin/bash
set -e;

if [ -z "$(which yarn)" ]; then
    npm install --global yarn && ln -s /root/.nvm/versions/node/v14.17.6/bin/yarn /usr/bin/yarn;
fi

npm config set unsafe-perm true;

    npm i --prefix=./packages/easy-email-core \
&&  npm i --prefix=./packages/easy-email-editor \
&&  npm i --prefix=./packages/easy-email-extensions \
&&  npm i;

cd demo && npm i;
cd ../ && npm run build:prod;

    rm -rf packages/easy-email-core/node_modules \
&&  rm -rf packages/easy-email-editor/node_modules \
&&  rm -rf node_modules \
&&  rm -rf demo/node_modules \
&&  rm -rf packages/easy-email-extensions/node_modules;

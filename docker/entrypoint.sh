# This check is needed because when executing the up -d first time it will install yarn but on next time the
# yarn binary is already there so it will crash on linking.
if [ -z "$(which yarn)" ]; then
    npm install --global yarn && ln -s /root/.nvm/versions/node/v14.17.6/bin/yarn /usr/bin/yarn;
fi
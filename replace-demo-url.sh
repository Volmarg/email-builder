#!/bin/bash

sed -i 's/12.9.1.6/mail-builder.voltigo.pl/g' $(grep -lrw ./demo/dist/assets -e '12.9.1.6' | grep -v 'map')
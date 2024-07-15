All that is in here is explicitly for the `iframe cummunication page` via static file (due to performance issues when using any EasyEmail url in frame on other page).

See `/demo/public/communication/static-page.html`.

Webpack's configuration for this is in `/demo/src/webpack.config.js` - might need to be moved to other directory if some more changes in code will be needed.

Do this to build new output js file:
1. Go to `demo` folder
2. Call this `npm run build-static-communication-bundle`

<h2> Known issues </h2>

1. Wrong compilation folder,
- sometimes on different machine the compiled data ends in wrong folder, check `./demo/public/static` and `./demo/src/public/static`
- either move it manually, create `ln -s`, or change output path in `./webpack.config.js`
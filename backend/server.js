// IMPORTS
var config = require('../webpack.config');
var koa = require('koa');
var koaEjs = require('koa-ejs');
var koaRouter = require('koa-router');
var koaStatic = require('koa-static');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

const router = koaRouter();
const app = koa();

koaEjs(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

router.get('/', function *(next) {
  yield this.render('homepage', {
    foo: 123
  });
});

app
.use(router.routes())
.use(router.allowedMethods())
.use(koaStatic(path.join(__dirname, 'static')))
.listen(config.KOA_SERVER_PORT);

console.log(`Koa server listening on port ${ config.KOA_SERVER_PORT }.`);

// WEBPACK DEV SERVER //////////////////////////////////////////////////////////
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {

  hot: true,

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    '*': `http://0.0.0.0:${ config.KOA_SERVER_PORT }`
  }

}).listen(config.HOTLOADER_SERVER_PORT, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log(`Hot loader listening at 0.0.0.0:${ config.HOTLOADER_SERVER_PORT }`);
});
/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

// The UserAgent is used to detect IE11. Only IE11 requires ES5.
(function () {

  function _ojIsIE11() {
    var nAgt = navigator.userAgent;
    return nAgt.indexOf('MSIE') !== -1 || !!nAgt.match(/Trident.*rv:11./);
  };
  var _ojNeedsES5 = _ojIsIE11();

  requirejs.config(
    {
      baseUrl: 'js',
      map: {
        '*': { 'lib/Observable.js': 'js/libs/zen-observable/lib/Observable.js' }
      },
      packages: [{
        name: "subscriptions-transport-ws",
        main: "client",
        location: "libs/subscriptions-transport-ws"
      }, , {
        name: "graphql/language",
        main: "index",
        location: "libs/graphql/language"
      }, {
        name: "graphql/type",
        main: "index",
        location: "libs/graphql/type"
      }, {
        name: "graphql/execution",
        main: "index",
        location: "libs/graphql/execution"
      }, {
        name: "graphql/subscription",
        main: "index",
        location: "libs/graphql/subscription"
      }, {
        name: "graphql/validation",
        main: "index",
        location: "libs/graphql/validation"
      }, {
        name: "graphql/error",
        main: "index",
        location: "libs/graphql/error"
      }, {
        name: "graphql/utilities",
        main: "index",
        location: "libs/graphql/utilities"
      }, {
        name: "graphql",
        main: "index",
        location: "libs/graphql"
      }],

      // Path mappings for the logical module names
      paths:
      // injector:mainReleasePaths
      {
        'knockout': 'libs/knockout/knockout-3.5.0.debug',
        'jquery': 'libs/jquery/jquery-3.4.1',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
        'hammerjs': 'libs/hammer/hammer-2.0.8',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.1',
        'ojs': 'libs/oj/v8.0.0/debug' + (_ojNeedsES5 ? '_es5' : ''),
        'ojL10n': 'libs/oj/v8.0.0/ojL10n',
        'ojtranslations': 'libs/oj/v8.0.0/resources',
        'text': 'libs/require/text',
        'signals': 'libs/js-signals/signals',
        'customElements': 'libs/webcomponents/custom-elements.min',
        'proj4': 'libs/proj4js/dist/proj4-src',
        'css': 'libs/require-css/css',
        'touchr': 'libs/touchr/touchr',
        'corejs': 'libs/corejs/shim',
        'regenerator-runtime': 'libs/regenerator-runtime/runtime'
      }
      // endinjector
    }
  );
}());

require(['ojs/ojbootstrap', 'root'], function (Bootstrap, Root) {
  // this callback gets executed when all required modules are loaded
  Bootstrap.whenDocumentReady().then(function () {
    var root = new Root.default();
  });
});

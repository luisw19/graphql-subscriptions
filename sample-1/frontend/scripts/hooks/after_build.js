/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';
const { exec } = require('child_process');

module.exports = function (configObj) {
  console.log("Running after_build hook.");
  return new Promise((resolve, reject) => {
    exec('node ./node_modules/requirejs/bin/r.js -convert ./web/js/libs ./web/js/libs', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      }
    })
  });
};
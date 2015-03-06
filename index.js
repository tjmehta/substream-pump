'use strict';

module.exports = pump;

function pump (readStream, writeStream, callback) {
  var callbackCalled = false;

  function call(a, b, c) {
    if (callback && !callbackCalled) {
      callback(a, b, c);
      callbackCalled = true;
    }
  }

  readStream.addListener('data', function(chunk) {
    if (writeStream.write(chunk) === false && readStream.pause) {
      readStream.pause();
    }
  });

  writeStream.addListener('drain', function() {
    if (readStream.resume) {
      readStream.resume();
    }
  });

  readStream.addListener('end', function() {
    writeStream.end();
  });

  readStream.addListener('close', function() {
    call();
  });

  readStream.addListener('error', function(err) {
    if (writeStream.end) {
      writeStream.end();
    }
    call(err);
  });

  writeStream.addListener('error', function(err) {
    if (readStream.destroy) {
      readStream.destroy();
    }
    call(err);
  });
}
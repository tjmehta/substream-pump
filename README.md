# substream-pump
because primus substreams don't have pipes :(

##Usage

```js
var pump = require('substream-pump');

// callback is optional for errors or on readable close
pump(streamOrSubstreamSource, substreamDest, cb);
```

##License
MIT
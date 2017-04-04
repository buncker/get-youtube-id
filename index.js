
(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.getYouTubeID = factory();
  }
}(this, function (exports) {
  return function (url, opts) {
    var result = false;
    if (opts == undefined) {
      opts = {fuzzy: true};
    }

    if (/youtu\.?be/.test(url)) {

      // Look first for known patterns
      var i;
      var patterns = [
        /youtu\.be\/([^#\&\?]{11,})/,  // youtu.be/<id>
        /\?v=([^#\&\?]{11,})/,         // ?v=<id>
        /\&v=([^#\&\?]{11,})/,         // &v=<id>
        /embed\/([^#\&\?]{11,})/,      // embed/<id>
        /\/v\/([^#\&\?]{11,})/         // /v/<id>
      ];

      // If any pattern matches, return the ID
      for (i = 0; i < patterns.length; ++i) {
        if (patterns[i].test(url)) {
          result = patterns[i].exec(url)[1];
        }
      }

      if (opts.fuzzy) {
        // If that fails, break it apart by certain characters and look 
        // for the 11 character key
        var tokens = url.split(/[\/\&\?=#\.\s]/g);
        for (i = 0; i < tokens.length; ++i) {
          if (/^[^#\&\?]{11,}$/.test(tokens[i])) {
            result = tokens[i];
          }
        }
      }
    }

    if (result && result.length > 11) {
      return false;
    }
    return result;
  };

}));

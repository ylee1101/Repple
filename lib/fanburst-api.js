'use strict';

var
  apiMe = require('./me'),
  apiFollowing = require('./following');

function FanburstModule(opts) {
  opts = opts || {};
  var _this = this;
  this.credentials = opts.credentials ? opts.credentials : {};
  this.baseUrl     = opts.baseUrl || 'https://api.fanburst.com';

  var
    keysClientId = ['3adad1d1-c958-4b47-8631-bff3ddec3f3d'],
    keysClientSecret = ['f0f59aa9b01f5bde6042efe8aaee2925aede0ed987712bec86c346b7e72fe5c3'],
    keysCallbacks = ['https://www.getpostman.com/oauth2/callback'],
    objCredentials = {
      clientId: keysClientId,
      clientSecret: keysClientSecret,
      redirect_uri: keysCallbacks
    };

  for (var keyCredential in objCredentials) {
    objCredentials[keyCredential].forEach(function(key) {
      if (opts[key]) {
        _this.credentials[keyCredential] = opts[key];
      }

      if (_this.credentials[key]) {
        _this.credentials[keyCredential] = _this.credentials[key];
      }
    });
  }
}

FanburstModule.prototype.me = apiMe.get;
FanburstModule.prototype.followingAdd = apiFollowing.add;
FanburstModule.prototype.followingContains = apiFollowing.contains;

module.exports = FanburstModule;

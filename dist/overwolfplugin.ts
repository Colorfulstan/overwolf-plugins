function OverwolfPlugin(extraObjectNameInManifest: string, addNameToObject: boolean) {
  let _pluginInstance  = null;
  const _extraObjectName = extraObjectNameInManifest;
  const _addNameToObject = addNameToObject;

  // public
  this.initialize = function (callback) {
    return _initialize(callback);
  };

  this.initialized = function () {
    return _pluginInstance != null;
  };

  this.get = function () {
    return _pluginInstance;
  };

  // privates
  function _initialize(callback) {
    let proxy = null;

    try {
      proxy = overwolf.extensions.current.getExtraObject;
    } catch (e) {
      console.error(
        'overwolf.extensions.current.getExtraObject doesn\'t exist!');
      return callback(false);
    }

    proxy(_extraObjectName, function (result) {
      if (result.status !== 'success') {
        console.error(
          'failed to create ' + _extraObjectName + ' object: ' + result);
        return callback(false);
      }

      _pluginInstance = result.object;

      if (_addNameToObject) {
        _pluginInstance._PluginName_ = _extraObjectName;
      }

      return callback(true);
    });
  }
}

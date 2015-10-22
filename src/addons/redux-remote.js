/*
Mag.JS Redux Remote Connect reducer v0.1
http://github.com/magnumjs/mag.js
(c) Michael Glazer
License: MIT
*/

//TODO: put this somewhere else
// e.g. it's own middleware file

Redux.readyStatePromise = function(store) {
  return function(next) {
    return function(action) {

      if (!action.promise) {
        return next(action);
      }

      function makeAction(ready, data) {
        var newAction = Object.assign({}, action, {
          ready: ready
        }, data);
        delete newAction.promise;
        return newAction;
      }

      var SUCCESS = FAILURE = REQUEST = action.type;

      if (action.types && Array.isArray(action.types)) {
        REQUEST = action.types[0];
        SUCCESS = action.types[1];
        FAILURE = action.types[2];
      }

      next(makeAction(false, {
        type: REQUEST
      }));
      return action.promise.then(function(result) {
        return next(makeAction(true, {
          result: result,
          type: SUCCESS
        }));
      }, function(error) {
        return next(makeAction(true, {
          error: error,
          type: FAILURE
        }));
      });
    };
  };
};


//TODO: add more action types for hookins from user
// e.g. REMOTE_LOAD_FAILED, REMOTE_SAVE_SUCCESS, REMOTE_SAVE_PENDING ..

Redux.remoteReducer = (function(window) {


  var remoteReducer = function(options) {

    var storageType = window[options.storageType || 'sessionStorage']
    var initialState = options.cache
    var expires = options.expires || 3000;
    var SOURCE_URL = options.source

    var types1 = options.types;
    var actions1 = options.actions;

    var key = options.key;
    var reducer1 = key ? options[key] : options.reducer;

    // add to types
    var types2 = {
        SAVE_STATE: 'SAVE_STATE',
        SET_STATE_REQUEST: 'SET_STATE_REQUEST',
        SET_STATE_SUCCESS: 'SET_STATE_SUCCESS'
      }
      //add to actions
    var actions2 = {
      saveState: function(lastState) {
        return {
          type: types2.SAVE_STATE,
          promise: saveData(lastState),
          lastState
        }
      },
      loadState: function(param) {
        return {
          types: [types2.SET_STATE_REQUEST, types2.SET_STATE_SUCCESS],
          promise: getData(param),
          param
        }
      }
    }

    //Privates :
    var cache;

    function setCache(data) {
      storageType.setItem(SOURCE_URL, JSON.stringify(cache))
      return cache = data;
    }

    function getCache() {
      return cache = JSON.parse(storageType.getItem(SOURCE_URL))
    }

    var cache;

    function saveData(data) {

      //Reset caches:
      setCache(data)

      return mag.request({
        url: SOURCE_URL,
        method: 'put',
        data: JSON.stringify(data),
        headers: [{
          "Content-Type": "application/json; charset=utf-8"
        }]
      })

    }

    function getData() {
      if (getCache()) {
        var def = mag.deferred();
        def.resolve(getCache())
        return def.promise
      } else {
        return mag.request({
          url: SOURCE_URL
        })
      }
    }

    var types = mag.merge(types1, types2)
    var actions = mag.merge(actions1, actions2)
      // add to existing reducer
    function reducer2(state, action) {

      switch (action.type) {
        case types2.SAVE_STATE:
          if (action.ready) {
            return setCache(action.result);
          }
          return state;
        case types2.SET_STATE_SUCCESS:
          if (action.ready) {
            //save in cache / storage
            return setCache(action.result)
          }
          return state;
        default:
          return state || [];
      }
    }

    var check = function() {
      if (JSON.stringify(lastState) !== JSON.stringify(cache)) {
        // save to remote url
        Iapp().getProps().saveState(lastState)
      }
    }
    var timer, delay = expires;
    var lastState;

    var reducer = function(state, action) {

      // debounce changes -- check for diffs
      // then save to source url
      clearTimeout(timer);
      timer = setTimeout(function() {
        check.call();
      }, delay);


      state = reducer1(state, action)
      state = reducer2(state, action)

      return lastState = state;
    }

    var Iapp;

    function init(app) {
      Iapp = app
      app().getProps().loadState()
    }

    return {
      reducer, actions, types, init, invalidate: function() {
        setCache()
      }
    }
  }

  return remoteReducer;
})(window)

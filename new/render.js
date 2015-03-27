var mag = (function(mag) {

  var render = {
    roots: [],
    templates: {},
    cache: {}
  }

  var unloaders = [],
    cached = [],
    pendingRequests = 0

    function callView(elementClone, module, i) {
      var args = module.getArgs(i)

      var mod = module.modules[i]
      var controller = module.controllers[i]

      // var controllerConstructor = mod.controller.$original || mod.controller
      // var controller = controllerConstructor === cached.controllerConstructor ? cached.controller : new(mod.controller || function() {})

      mod.view(elementClone, controller)

      // if (controller.onunload) unloaders.push({
      //   controller: controller,
      //   handler: controller.onunload
      // })
    }
  render.callConfigs = function(configs) {
    //for (var i = 0, len = configs.length; i < len; i++) configs[i]()
  }
  var cache = []
  render.redraw = function(module, fill, WatchJS) {
    module = module || render.module || {}
    this.fun || (this.fun = debounce(function() {
      var redrawing = false

      if (redrawing) return
      redrawing = true
      var prev
      var marker = '__' + new Date + '__'

      for (var i = 0, root; root = render.roots[i]; i++) {
        if (module.controllers[i]) {
          var elementClone = module.elements[i]
          console.time('Mag.JS:render:' + elementClone.id)

          // prevent infinite recursion
          if (marker in elementClone) return

          var args = module.getArgs(i)

          if (cache[i] && cache[i]===JSON.stringify(args[0])) {
            continue
          }
          callView(elementClone, module, i)

          WatchJS.watch(args[0], debounce(function(ele, i, module, changeId) {
            console.time('Mag.JS:re-render:' + ele.id)
            var args = module.getArgs(i)

            // check if data changed
            if (cache[i] !== JSON.stringify(args[0])) {
              callView(ele, module, i)
              fill.fill(ele, args[0])
              WatchJS.noMore = true
              render.callConfigs(fill.configs)
              prev = JSON.stringify(args[0])
            }
            
            redrawing = false
            console.timeEnd('Mag.JS:re-render:' + ele.id)
          }.bind(null, elementClone, i, module)))

          fill.fill(elementClone, args[0])
          render.callConfigs(fill.configs)
          cache[i] = JSON.stringify(args[0])
          redrawing = false
          elementClone[marker] = true
          console.timeEnd('Mag.JS:render:' + elementClone.id)
        }
      }
      console.timeEnd("MagnumJS:init")
    }))
    this.fun()
  }

  var $cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
  var $requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;

  var debounce = function(fn, threshhold) {
    var lastRedrawCallTime, FRAME_BUDGET = threshhold || 16,
      deferTimer

    return function() {
      if (+new Date - lastRedrawCallTime > FRAME_BUDGET || $requestAnimationFrame === window.requestAnimationFrame) {
        // hold on to it
        if (deferTimer > 0) $cancelAnimationFrame(deferTimer)

        deferTimer = $requestAnimationFrame(function() {
          lastRedrawCallTime = +new Date
          fn.apply(this, arguments);
        }, FRAME_BUDGET);
      } else {
        lastRedrawCallTime = +new Date
        fn.apply(this, arguments);
      }
    }
  }

  mag.render = render
  return mag

}(window.mag || {}))

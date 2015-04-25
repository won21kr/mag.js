var mag = {}
var noop = function() {}

var type = {}.toString
var ARRAY = '[object Array]'
var OBJECT = '[object Object]'
var STRING = "[object String]"

var $location = location


var modes = {
  pathname: "",
  hash: "#",
  search: "?"
};
var redirect = noop,
  routeParams, currentRoute, isDefaultRoute = false;
mag.route = function() {
  //m.route()
  if (arguments.length === 0) return currentRoute;
  //m.route(el, defaultRoute, routes)
  else if (arguments.length === 3 && type.call(arguments[1]) === STRING) {
    var root = arguments[0],
      defaultRoute = arguments[1],
      router = arguments[2];
    redirect = function(source) {
      var path = currentRoute = normalizeRoute(source);
      if (!routeByValue(root, router, path)) {
        if (isDefaultRoute) throw new Error("Ensure the default route matches one of the routes defined in m.route")
        isDefaultRoute = true
        mag.route(defaultRoute, true)
        isDefaultRoute = false
      }
    };
    var listener = mag.route.mode === "hash" ? "onhashchange" : "onpopstate";
    window[listener] = function() {
      var path = $location[mag.route.mode]
      if (mag.route.mode === "pathname") path += $location.search
      if (currentRoute != normalizeRoute(path)) {
        redirect(path)
      }
    };
    computePreRedrawHook = setScroll;
    window[listener]()
  }
  //config: m.route
  else if (arguments[0].addEventListener || arguments[0].attachEvent) {
    var element = arguments[0];
    var isInitialized = arguments[1];
    var context = arguments[2];
    var vdom = arguments[3];
    element.href = (mag.route.mode !== 'pathname' ? $location.pathname : '') + modes[mag.route.mode] + vdom.attrs.href;
    if (element.addEventListener) {
      element.removeEventListener("click", routeUnobtrusive);
      element.addEventListener("click", routeUnobtrusive)
    } else {
      element.detachEvent("onclick", routeUnobtrusive);
      element.attachEvent("onclick", routeUnobtrusive)
    }
  }
  //m.route(route, params, shouldReplaceHistoryEntry)
  else if (type.call(arguments[0]) === STRING) {
    var oldRoute = currentRoute;
    currentRoute = arguments[0];
    var args = arguments[1] || {}
    var queryIndex = currentRoute.indexOf("?")
    var params = queryIndex > -1 ? parseQueryString(currentRoute.slice(queryIndex + 1)) : {}
    for (var i in args) params[i] = args[i]
    var querystring = buildQueryString(params)
    var currentPath = queryIndex > -1 ? currentRoute.slice(0, queryIndex) : currentRoute
    if (querystring) currentRoute = currentPath + (currentPath.indexOf("?") === -1 ? "?" : "&") + querystring;

    var shouldReplaceHistoryEntry = (arguments.length === 3 ? arguments[2] : arguments[1]) === true || oldRoute === arguments[0];

    if (window.history.pushState) {
      computePreRedrawHook = setScroll
      computePostRedrawHook = function() {
        window.history[shouldReplaceHistoryEntry ? "replaceState" : "pushState"](null, $document.title, modes[mag.route.mode] + currentRoute);
      };
      redirect(modes[mag.route.mode] + currentRoute)
    } else {
      $location[mag.route.mode] = currentRoute
      redirect(modes[mag.route.mode] + currentRoute)
    }
  }
};
mag.route.param = function(key) {
  if (!routeParams) throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()")
  return routeParams[key]
};
mag.route.mode = "search";

function normalizeRoute(route) {
  return route.slice(modes[mag.route.mode].length)
}

function routeByValue(root, router, path) {
  routeParams = {};

  var queryStart = path.indexOf("?");
  if (queryStart !== -1) {
    routeParams = parseQueryString(path.substr(queryStart + 1, path.length));
    path = path.substr(0, queryStart)
  }

  // Get all routes and check if there's
  // an exact match for the current path
  var keys = Object.keys(router);
  var index = keys.indexOf(path);
  if (index !== -1) {
    console.log('MOUNT1!!!', root, router[keys[index]]())
    return true;
  }

  for (var route in router) {
    if (route === path) {
      console.log('MOUNT2!!!', root, router[route])

      return true
    }

    var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$");

    if (matcher.test(path)) {
      path.replace(matcher, function() {
        var keys = route.match(/:[^\/]+/g) || [];
        var values = [].slice.call(arguments, 1, -2);
        for (var i = 0, len = keys.length; i < len; i++) routeParams[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
        m.mount(root, router[route])
      });
      return true
    }
  }
}

function routeUnobtrusive(e) {
  e = e || event;
  if (e.ctrlKey || e.metaKey || e.which === 2) return;
  if (e.preventDefault) e.preventDefault();
  else e.returnValue = false;
  var currentTarget = e.currentTarget || e.srcElement;
  var args = mag.route.mode === "pathname" && currentTarget.search ? parseQueryString(currentTarget.search.slice(1)) : {};
  while (currentTarget && currentTarget.nodeName.toUpperCase() != "A") currentTarget = currentTarget.parentNode
  mag.route(currentTarget[mag.route.mode].slice(modes[mag.route.mode].length), args)
}

function setScroll() {
  if (mag.route.mode != "hash" && $location.hash) $location.hash = $location.hash;
  else window.scrollTo(0, 0)
}

function buildQueryString(object, prefix) {
  var duplicates = {}
  var str = []
  for (var prop in object) {
    var key = prefix ? prefix + "[" + prop + "]" : prop
    var value = object[prop]
    var valueType = type.call(value)
    var pair = (value === null) ? encodeURIComponent(key) :
      valueType === OBJECT ? buildQueryString(value, key) :
      valueType === ARRAY ? value.reduce(function(memo, item) {
        if (!duplicates[key]) duplicates[key] = {}
        if (!duplicates[key][item]) {
          duplicates[key][item] = true
          return memo.concat(encodeURIComponent(key) + "=" + encodeURIComponent(item))
        }
        return memo
      }, []).join("&") :
      encodeURIComponent(key) + "=" + encodeURIComponent(value)
    if (value !== undefined) str.push(pair)
  }
  return str.join("&")
}

function parseQueryString(str) {
  if (str.charAt(0) === "?") str = str.substring(1);

  var pairs = str.split("&"),
    params = {};
  for (var i = 0, len = pairs.length; i < len; i++) {
    var pair = pairs[i].split("=");
    var key = decodeURIComponent(pair[0])
    var value = pair.length == 2 ? decodeURIComponent(pair[1]) : null
    if (params[key] != null) {
      if (type.call(params[key]) !== ARRAY) params[key] = [params[key]]
      params[key].push(value)
    } else params[key] = value
  }
  return params
}
mag.route.buildQueryString = buildQueryString
mag.route.parseQueryString = parseQueryString


mag.route(document.body, "/", {
  "/": function() {
    console.log('home', arguments)
  },
  "/login": function() {
    console.log('login', arguments)
  }
});
/*
  <a id="link" href="/login">login</a>
*/

var element = document.getElementById('link')
element.href = (mag.route.mode !== 'pathname' ? $location.pathname : '') + modes[mag.route.mode] + element.getAttribute('href');
console.log(element.href)
element.addEventListener("click", routeUnobtrusive)

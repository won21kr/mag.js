<a href="//github.com/magnumjs/mag.js">
<img alt="Mag.JS - Elegant DOM Bindings" src="https://cloud.githubusercontent.com/assets/5196767/7222868/53794478-e6e5-11e4-886c-40c2a3512654.png"/>
</a>

### Intuitive, tiny, fast, JavaScript 2 HTML component templating library.
<hr>
##Features
 
* Changes to state are immediately reflected in the dom by their element matchers. <a href="#performance">Super crazy fast</a> & 5KB Gzipped!
* Valid HTML templates - No virtual/shadow dom or new templating language!
* Semantic data binding - Use normal HTML as a template and a related module (plain JS object) as instructions for transpiling/interpolations.
* Module has a constructor, called once and a viewer called on every change to the state of that module.
* Collection rendering - No need for hand-written loops. Write templates as a part of the HTML, in plain HTML
* View logic in JavaScript - No crippled micro-template language, just plain JavaScript functions
* Native events & attributes, full life cycle events control, Hookin to modify and create custom attributes

##[Getting started](https://github.com/magnumjs/mag.js/blob/master/examples/tutorials/getting-started.md) ::: <a href="#examples">Examples</a> - <a href="#tutorials">Tutorials</a> - <a href="#simple-api">Api</a> - <a href="#jasmine-specs">Tests</a> - <a href="#performance">Performance</a>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=xdjPez4oOTA
" target="_blank"><img src="http://img.youtube.com/vi/xdjPez4oOTA/0.jpg" 
alt="Mag.JS - Elegant DOM Bindings" width="774" height="480" border="10" /></a>


> *"There is no JavaScript code in the HTML and there is no HTML code in the JavaScript!"*

###Hello MagJS!

```javascript
Initial dom:
<div id="hello">
  <h1></h1>
</div>

Module:
mag.module('hello', {
  view: function(state) {
    state.h1 = 'Hello Mag.JS!'
  }
})

Mag.JS dom!:
<div id="hello">
  <h1>Hello Mag.JS!</h1>
</div>
```

*View receives 2 arguments, "state" & "props"* 

1. <code>state</code> is the DOM element(s) we want to set/get - the element Matchers and their controls
  1. Any change to the <code>state</code> object will trigger a redraw of the view - it is observed.
2. <code>props</code> is what we want the DOM element(s) to be set to - the data
 2. If the <code>props</code> have changed a new view redraw will run if triggered.
 2. <code>props</code> is passed from the parent and is set by <code>mag.module()</code> or an instance `instance (props)`
 
 
###Dynamic node example with controller

```javascript
mag.module(document.body, {
  controller: function() {
    this.h2 = 'Hello MagJS World!';
  }
});
```
Controllers are only called once vs views which are re-run on every change to the state.
[Example](http://jsbin.com/foduyagimi/edit?js,output) - [Prevent initial placeholder flicker](http://jsbin.com/qedijimeso/edit?js,output)

###Two way binding

```javascript
var Component = {
  controller: function(props) {
    this.$hello = '';
    this.hello = {
      _onInput: () => {}
    }
  }
}
```
Only needed to define the default value of the property to bind and the event when the change is bound.
- [Example](http://jsbin.com/maxulalasa/edit?js,output) 
- [Multiple fields](http://jsbin.com/vixupukefo/edit?js,output) 
- [Hookin attribute](http://jsbin.com/gosusitara/edit?html,output)

##Tutorials

* [Introduction Part1](//github.com/magnumjs/mag.js/blob/master/examples/tutorials/intro-part1.md)
* [Introduction Part2](//github.com/magnumjs/mag.js/blob/master/examples/tutorials/intro-part2.md)
* [mag-komposer - Compose MagJS Containers](//github.com/magnumjs/mag.js/blob/master/examples/tutorials/mag-komposer.md)
* [Comments Components from 
](//github.com/magnumjs/mag.js/blob/master/examples/tutorials/react-comments-component.md)
* [Contacts Components from Mithril](//github.com/magnumjs/mag.js/blob/master/examples/tutorials/contacts-components.md)
* [Video Instructions](https://www.youtube.com/watch?v=OIXfxZ3DSC8&list=PLtWfKzAMcA-hcOkgjW3onCBM6vBw-PDOf)
* [Composable components](//github.com/magnumjs/mag.js/blob/master/examples/components/README.md)
* [MagJS version of James Longs' "why react is awesome"](http://rawgit.com/magnumjs/mag.js/master/examples/tutorials/james-awesome.html)
* [More Tutorials..](//github.com/magnumjs/mag.js/blob/master/examples/tutorials/README.md)


###Hello world!

[JSBin](http://jsbin.com/regofevuvu/edit?js,output) - [Take 2](http://jsbin.com/gefanapuvi/edit?js,output) - [Take3](http://jsbin.com/leyuxohago/edit?js,output) - [Take 4](http://jsbin.com/boziqevuka/edit?js,output) - [Take 5](http://jsbin.com/xatabagezu/edit?js,output) - [Merge Props](http://jsbin.com/junexinuka/edit?js,output) - [Proxy](http://jsbin.com/howasicuba/edit?js,output) - [No view only controller](http://jsbin.com/sozupogucu/edit?js,output)

Initial html
```html
<div id="hello">
  <label>Name:</label>
  <input type="text" placeholder="Enter a name here" />
  <hr/>
  <h1>Hello <span class="name"></span>!</h1>
</div>
```
Module:

```javascript
mag.module("hello", {
  view: function(state) {
    state.input = {
      _oninput: function() {
        state.name = this.value
      }
    }
  }
})
```

##Boilerplates
[Boilerplate JSbin](http://jsbin.com/yapifujuku/edit?js,output) - [Latest](http://jsbin.com/pizoxiyeki/edit?html,output) - [Boilerplate Plunker](http://embed.plnkr.co/Rk9IsJqEjtKPrCSLsFs5/) - [Boilerplate Plunker Modular](http://embed.plnkr.co/0VJoUfBC6uayPPWw5krr/) -  [Boilerplate Plunker Modular v0.2](http://embed.plnkr.co/amqDNol7ibvKHrW6J6LK/)

##Examples

[Hello world](http://jsbin.com/vufizohayi/edit?js,output) - 
[Hello world, take2](http://jsbin.com/mumiyadewe/edit?js,output) - [With dynamic Node](http://jsbin.com/gexobuyuhi/edit?js,output)

[Simple Component Container](http://jsbin.com/zakabodece/edit?js,output)

[Simple Wrapped component - HoC](http://jsbin.com/cojidiwuye/edit?html,output) - [Reusable Container - HoC](http://jsbin.com/tezabisose/edit?html,output) - [Flicker free](http://jsbin.com/watisegudi/edit?html,output)

[Simple tabbed content](http://jsbin.com/zewuvaraqe/edit?html,output)

[Basic Math: addition](http://jsbin.com/hejujixumi/edit?html,js,output) - 
[Basic Math: addition (no auto binding)](http://jsbin.com/cenuvozofa/edit?html,js,output) -  [Take 3](http://jsbin.com/dajewaqule/edit?js,output) - [Take 4](http://jsbin.com/gabumocijo/edit?html,js,output) - [V0.12 auto wiring](http://jsbin.com/mosagojopa/edit?html,js,output) - [Video tutorial](http://youtu.be/OIXfxZ3DSC8) - [Nested data auto wiring](http://jsbin.com/nogupefuga/edit?js,output)

[Auto wiring - select menu](http://jsbin.com/roriyisilo/edit?js,output)

[Simple messaging component example](http://jsbin.com/biharowaba/edit?js,output) - [Video tutorial](https://www.youtube.com/watch?v=WLSNbSOk1CY) - [Take 2, w/Reusable child component](http://jsbin.com/vafovoguka/edit?html,js,output) - [Nested components](http://jsbin.com/curixakagu/edit?js,output)

[Hello world with passFail reusable component](http://jsbin.com/moziseporo/edit?js,output) - [Modal component w/CSS Transitions](https://embed.plnkr.co/xK4TMqIuFeVjGso9KeV5/)

[Hello world (proxy support/Firefox since v0.7.4+, polyfill object.observe since v0.8.6):]
(http://jsbin.com/badabiqigu/edit?js,output) - [native v0.22](http://jsbin.com/wonivehuve/edit?html,js,output) [v0.22.8](http://jsbin.com/dosobawire/edit) - [v0.22.9](http://jsbin.com/zemuzifidi/edit?js,output) - [Take2](http://jsbin.com/tifinomigi/edit?js,output)

[Hello array lifecycle event:]
(http://jsbin.com/webucanulu/edit?js,output)

[Count]
(http://jsbin.com/semilohoja/edit?js,output) - [Dynamic reusable counter component](http://jsbin.com/kisicoroya/edit?html,output) - [With shared state](http://jsbin.com/devehifote/edit?html,output)

[List] 
(http://jsbin.com/sewomabihe/edit?js,output) - [Reverse list](http://jsbin.com/samolezocu/edit?js,output)

[More lists:]
(http://jsbin.com/mefefozaxe/edit?js,output)

[Sortable List:]
(http://jsbin.com/ralutazaka/edit?js,output)

[Tiny filter:]
(http://jsbin.com/reqigohete/edit?js,output)

[Filter list](http://jsbin.com/jokugejosa/edit?js,output) - [Leaderboard](http://jsbin.com/qatukoyuxu/edit?js,output)

[Filter list sort:]
(http://jsbin.com/dedoferoqu/edit?js,output)

[Filter list components:]
(http://jsbin.com/tuduzapecu/edit?js,output)

[Quiz](http://jsbin.com/wacoqufeho/edit?html,js,output)

[Forms - input handling](http://jsbin.com/yeburizuro/edit?js,output) - [AutoComplete w/spinner](http://jsbin.com/nukedikode/edit?html,output) - [Select menu](http://jsbin.com/goxejiqeso/edit?html,output) - [Select addon](http://jsbin.com/bamogobine/edit?html,output)

[Forms - passFail component](http://jsbin.com/sopitoneyu/edit?js,output) - [Search Highlight](http://jsbin.com/wineqowovo/edit?html,output)

[Form & list - model - comps - boilerplate](http://embed.plnkr.co/w3BSEEp0w5iWzM7B7QIw/)

[Tab component:]
(http://jsbin.com/ziqivuceyu/edit?js,output) - [Take2](http://jsbin.com/yigijapexu/edit?js,output)

[Modal component:]
(http://jsbin.com/yuyapesede/edit?js,output)

[Modal with select menu:]
(http://jsbin.com/yiyivasega/edit?js,output)

[Forms - composable components - link manager](http://jsbin.com/faqisutezo/edit?js,output)

[Todos:]
(http://jsbin.com/mijixinuxu/edit?js,output) [Take2](http://jsbin.com/pexigilofo/edit?js,output) - [Take3](http://jsbin.com/yutedisesa/edit?html,js,output) - [Simple v0.2](http://jsbin.com/cehukabesi/edit?js,output) - [Simple v0.2 component](http://jsbin.com/tumupipede/edit?js,output), [Take2](http://jsbin.com/detehosene/edit?js,output) - [v0.24](http://jsbin.com/votisiwire/edit?html,output)

[Todo Proxy]
(http://jsbin.com/jotapujeho/edit?js,output)

[Todos (expanded):]
(http://jsbin.com/yimozefuma/edit?js,output)

[Contacts:]
(http://jsbin.com/logikijuke/edit?js,output) - [Take 2](http://jsbin.com/gupebetati/edit?js,output)

[Async:]
(http://jsbin.com/qukanukuko/edit?js,output)

[Async - Geo Location](http://jsbin.com/giquhayepe/edit?js,output)

[Infinity scroll](http://jsbin.com/tetazujeti/edit?html,output)

[CSS transitions](http://jsbin.com/tasesohiku/edit?html,output)

[Movie plotter service](http://jsbin.com/qurinixihu/edit?html,output) - [Plot selection](http://jsbin.com/batatopini/edit?html,output)
 - [Radio selection](http://jsbin.com/boxukuqisu/edit?html,output)
 - [With spinner](http://jsbin.com/fanuvegapi/edit?html,output)

###Mithril 2 Mag
[Rotate Links](http://jsbin.com/tajogozite/edit?js,output) - [Alternate](http://jsbin.com/mabibixufu/edit?html,output) - [Web service](http://jsbin.com/fogajilocu/edit?html,output) - [Loader](http://jsbin.com/mizicojubi/edit?html,output)

[Pagination](http://embed.plnkr.co/sPbwAzVKD69ZVOW3yDg7/)

[Volunteer form application](http://embed.plnkr.co/lgms6KqkMWBTk2fTcwVb/)

[Ajax Github Api](http://jsbin.com/noqibividi/edit)

[REM API - User list](https://embed.plnkr.co/Ci0CNC1121nEqqQpwVEH/)

[Simple Application](https://embed.plnkr.co/ennFAg8slrlqDMoGrTpP/) - [Tutorial](https://github.com/magnumjs/mag.js/blob/master/examples/tutorials/simple-application.md)

###React 2 Mag
[Getting started with React example](http://jsbin.com/xatixeraza/edit?js,output) - [Latest](http://jsbin.com/watopumitu/edit?html,output) - [Controller default](http://jsbin.com/hujuwefoko/edit?js,output)

[Navigation menu:]
(http://jsbin.com/fajobahaja/edit?js,output)

[Timer]
(http://jsbin.com/jiwosereri/edit?html,output) - [Timer components](http://jsbin.com/zaqawiredi/edit?html,output)

[TabList - key components](http://jsbin.com/gucitesohi/edit?html,js,output)

[TabList module pattern - dynamic children keys](http://embed.plnkr.co/BBqYUo2Vq7H3FoUB3QA8/) - [Video Tutorial](https://www.youtube.com/watch?v=0XvXxw_S-fU&index=15&list=PLtWfKzAMcA-hcOkgjW3onCBM6vBw-PDOf)

[Real-time search:]
(http://jsbin.com/secozicofa/edit?js,output) 
[Same with different code style - creative Mag.JS!]
(http://jsbin.com/vulujetesi/edit?js,output)

[FilterableProductTable/static version (Thinking in React tutorial):]
(http://jsbin.com/firevuzege/edit?js,output)

[FilterableProductTable (Thinking in React tutorial):]
(http://jsbin.com/bidomewequ/edit?html,output)

[Occlusion culling](http://embed.plnkr.co/gA8SbzIb6hDPmBjYDeYb/preview) - [v0.22](http://embed.plnkr.co/OX88w963dxC6jCZLELoD/)

[Tab state (From Why React is Awesome)](http://embed.plnkr.co/zI0gNs6ijxcSUQTuM377/preview)

[Weather App:]
(http://jsbin.com/yigarawudi/edit?js,output) [Take 2](http://jsbin.com/hexalehujo/edit?js,output)

[Comment Box:]
(http://jsbin.com/ginuzisogi/edit?js,output) - [Video tutorial:]
(https://youtube.com/watch?v=QEnyWHSsMFg) - [Take1](http://jsbin.com/wusuluvoki/edit?js,output),
[Take 2](http://jsbin.com/kuyaxamoru/edit?js,output) - [Take3 - MagJS v0.14](http://embed.plnkr.co/PY1KzIPwDiUpE4vyraeC/) - [Module Pattern](http://embed.plnkr.co/Yqe7q3y1ST5wu2yt1OpR/) [Video tutorial](https://www.youtube.com/watch?v=89TCVe0WyaI)

[Image app with AJAX](http://embed.plnkr.co/fQzaidtY4GvsKH2k2Dtq/)

[Employee Directory with tiny Router](http://embed.plnkr.co/VJq2DEflPX7VKQHba6Oa/) - [Take2](http://embed.plnkr.co/FtkDDQwSuH8LPhxP5JPF/)

[News feed with undo state](http://embed.plnkr.co/XdMHLiZPxlTwk1mFMjjV/)

[Mag Redux implementation](http://embed.plnkr.co/39plzYcnwnqEhn5hI4vG/) 

[Mag Redux Async](http://embed.plnkr.co/YsZSrG9QPGoNyjhu1bf0/)

###Angular 2 Mag

[Todos](http://jsbin.com/leregacehe/edit?html,js,output)

[Order form:]
(http://jsbin.com/ziguzidayi/edit?js,output)

[Navigation menu:]
(http://jsbin.com/dedahasoda/edit?js,output)

[Switchable Grid:]
(http://jsbin.com/vinopakoze/edit?html,output)

[Contact Manager application:]
(http://jsbin.com/quviresiva/edit?js,output) - [Take 2](http://jsbin.com/hofoxodofa/edit?js,output)

[Country App - JSON/Routing]
(http://embed.plnkr.co/sWe3JEMnBHp272dNzb1N/)

[More advanced examples](https://github.com/magnumjs/mag.js/blob/master/examples/README.md)

##[Jasmine Specs](https://rawgit.com/magnumjs/mag.js/master/tests/specRunner.html)

###Statefullness
When redrawing the view method is called.
To maintain statefulness we can use the controller method.
Plainly these are default values.

HTML for below examples:
```html
<div id="lister">
  <h2></h2>
  <ul>
    <li class="item"></li>
  </ul>
</div>
```

Example without controller
```javascript
mag.module('lister', {
  view: function(state, props, element) {
  state.item = [1, 2, 3]
  state.title = 'Lister'
    state.h2 = {
      _text: state.title,
      _onclick: function() {
        state.show = state.show ? !state.show : true
        state.item.reverse()
        state.title = 'Gister' + state.show
      }
    }
  }
})
```
Example with controller
```javascript
mag.module('lister', {
  controller: function(props) {
    this.item = [1, 2, 3]
    this.title = 'Lister'
  },
  view: function(state, props, element) {
    state.h2 = {
      _text: state.title,
      _onclick: function() {
        state.show = state.show ? !state.show : true
        state.item.reverse()
        state.title = 'Gister' + state.show
      }
    }
  }
})
```

This link displays both for comparison:
http://jsbin.com/fopunubogi/edit?html,output

You can see that the first one when clicked nothing is changed while the second is dynamic.
The reasons is simply because the controller is called once while the view is called on every redraw/action/state change.

Here's an alternative approach to the above that only uses a view method and no controller for a similar result:
http://jsbin.com/xayobawuxo/edit?html,output

Example with config and without controller 

```javascript
mag.module("lister", {
  view: function(state) {
    var name1 = 'Yo!',
      name2 = 'Joe!'
    state.h2 = {
      _config: function(node, isNew) {
        if (isNew) {
          state.span = name1
          state.item = [1, 2, 3]
        }
      },
      _onclick: function() {
        state.item.reverse()
        state.span = state.span == name1 && name2 || name1;
      }
    }
  }
})
```
This is similar to using a controller or onload.
Every element has a _config to act as onload for hookins.
It receives 4 arguments:
* 1. is the element itself
* 2. is a boolean stating if this is attaching or not, first run is always true, subsequent executions are always false
* 3. context is an object that can be used to pass values to the method itself on every iterative call
  - a. one available sub method of context is onunload e.g. context.onunload = fun is called when the element is removed from the dom.
  - - context.onunload (configContext, node, xpath)
* 4. Index- the x path based index of the element


### Simple API


#### mag.module (String domElementID|Element Node, Object ModuleDefinition, Optional Object Properties )
This is the core function to attach a object of instructions to a dom element, when called it is executed.

ModuleDefinition is the instructions it needs to have a view function, controller is optional: (v0.22.9 view no longer required) 
```javascript
var component = {
  view: function (state, props, element) {
  }
}
```
view receives three arguments: state, props and element
* State is the object used to transpile the dom 
   - e.g. state.h1 ='Hello' converts the first h1 tag in the element to that value
* Props is the optional properties object passed to its mag.module definition
* Element is the node itself whose ID/Node was passed to its mag.module definition

The controller function has access to the original props as well as all life cycle events, it is only called once.

```javascript
var component = {
  controller: function (props) {
    this.didupdate = function (Event, Element, newProps) {
  },
  view: function (state, props, element) {
  }
}
```

There are 9 life cycle events: willload, willgetprops(v0.22.9), didload, willupdate, didupdate, isupdate, onbeforeunload (v0.24), onunload, onreload

They each get the same 3 parameters, their context is the controller no need to bind to `this`:

- Event - can be used to preventDefault - stop continued processing
- Element is the original module definition ID element
- newProps is the active state of the props, since the controller is only called once, the original props parameter contains  the original default values.
- [nextProps (4th argument in willgetprops, contains the next props)]
- [done() (4th argument in onbeforeunload, function to call when completed)]

```javascript
var instance = mag.module ('myElementId'|Element Node, component);
```

`Returns` a function Object that can be used to create a clone of the instance and the instances information such as InstanceID.

The function object to create a clone instance requires an index/key in its only parameter. When assigned to a `state` elementMatcher, MagJS does that for you.

These 7 methods are bound to the exact instance

`getId`
`draw`
`getState`
`getProps`
`subscribe` v0.22.1
`clones` v0.22.6
`destroy` v0.23.5

v0.23.1 For inner reflection the instanceID is available in all lifecycle methods, Note that this is not the elementID but instead the internal MagJS ID for each component includes clones, example:

`mag.redraw(mag.getNode(mag.getId(instanceID)), instanceID, 1);`

#### mag.create (String elementID|Element Node, Object ModuleDefinition, Optional Object props) - v0.20

Wraps around `mag.module` to return a reference instance you can call later.
The reference function can also over write the defaults given in create usually it will only over write the props

```javascript
var myComponent = mag.create('mydomId', {view:noop}) // not executed

var instance = myComponent({props:[]}) // executed 
//add a props.key for a unique component instance or else each call reuses existing.

// instance contains 7 sub methods 

instance.getId() // returns instance UID for MagJS use mag.getId(instanceId) to get the Node id and mag.getNode(ID) to get the Node itself

instance.draw() // redraws that unique instance, wrap in setTimeout for async
// optional boolean to force redraw i.e. clear the instance's cache instance.draw(true)

instance.getState([Optional instanceId]) // returns a copy of the current state values of that instance - state is async 

instance.getProps([Optional instanceId]) // returns a copy of the current props values of that instance, defaults to bound instance

instance.clones() //v0.22.6 returns list of any clones with their associated instanceId, and its own subscribe handler.

instance.subscribe(function(state, props, node, previous){
}); //v0.22.1 assign a handler to a given instance to get notified on unqiue changes after life cycle event `didupdate`

instance.destroy([Optional RemoveBoolean]) // v0.23.5 - if optional remove boolean is true the entire node is removed.
// this calls all nodes config unloaders and the controllers onunload event which can preventDefault.

// instance can be called directly with an index/key to clone the instance, usefull in data arrays
instance('myUniqueKeyIndex') // Usually not called directly, MagJS will create index when attached to state

// returns the live node clone
```

Normally there's no need to call the instance constructor function directly.
When passed to a state object MagJS will create the index for you with or without a key provided in props.

```javascript
state.myELementMatcher = myComponent({
  props: []
})

// array
state.myELementMatcher = [myComponent({
  props: [3, 2, 1]
}), myComponent({
  props: [1, 2, 3]
})]

//Array object
state.myELementMatcher = [{
  item: myComponent({
    props: [3, 2, 1]
  })
}, {
  item: myComponent({
    props: [1, 2, 3]
  })
}]
```


[JSBin example](http://jsbin.com/piyajitede/edit?html,js,output)


#### mag.redraw (node Element, idInstance magId, optional force Boolean)
initiate a redraw manually

Optional boolean argument to force cache to be cleared

#### mag.hookin (type, key, handler)
Allows for custom definitions, see examples [below](//github.com/magnumjs/mag.js/blob/master/README.md#custom-plugins)

**Control redrawing flow**

#### mag.begin ( int MagJS uid)

```javascript
var instance = mag.module('app', module)
mag.begin(instance.getId())
// run some long standing process without redrawing the module no matter what the state changes are
```

Once called the module will not run a redraw until the corresponding `mag.end(id)` is called even if `instance.draw()` is called and even with the optional `instance.draw(force true)`it will not run.

#### mag.end ( int MagJS uid)

```javascript
// run the redraw for the module
mag.end(instance.getId())
```
This will run the last redraw for the instance assuming the number of begins match the number of ends called.

If you call `mag.begin(id)` for the same instance ID twice you must call `mag.end(id)` the same number of times before it will run the redraw.

This is typically not necessary especially since MagJS runs updates to the module state very efficiently via the rAF (requestAnimationFrame)

### state object

State is the object that is watched for changes and is used to transpile the related dom parent element ID

there are 5 ways to reference an element within a module
* class name
* tag name
* data-bind attribute value
* id
* or name attribute value

state.h1 will match the first h1 element within a module (element id or parent node)

```javascript
This: <h1></h1>
With: state.h1 = 'Hello!'
Makes: <h1>Hello!</h1>
```

state.$h1 will match all h1s - greedy matcher, default only selects the first

To change the class for an element

```javascript
This: <h1></h1>
With: state.h1 = { _class: 'header', _text : 'Hello!'} 
Makes: <h1 class="header">Hello!</h1>
```

_text and _html are used to fill an elements text node and not as an attribute below.

any prefix underscore will be an attribute except for _on that will be for events such as 

```javascript
state.h1 = { _onclick: function() { state.h1='clicked!' } } 
```

#### Lists

Dealing with lists are simple and intuitive, including nested lists.

The first list element is used as the template for all new items on the list
For example:
```html
<ul><li class="item-template"></li></ul>
```

```javascript
state.li = [1,2]
```

Will render
```html
<ul>
  <li class="item-template">1</li>
  <li class="item-template">2</li>
</ul>
```

###Lists of Objects
```html
<ul><li class="item-template">People: <b class="name"></b></li></ul>
```
```javascript
state.li = [{name:'Joe'},{name:'Bob'}]
```

Will render
```html
<ul>
  <li class="item-template">People: <b class="name">Joe</b>
  </li>
  <li class="item-template">People: <b class="name">Bob</b>
  </li>
</ul>
```
###Nested Lists
```html
<ul>
  <li class="item-template">Project: <b class="projectName"></b>
    <ul>
      <li class="doneBy">
        <name/>
      </li>
    </ul>
    <tasks/>
  </li>
</ul>
```
```javascript
state['item-template'] = [{
    projectName: 'house cleaning',
    doneBy: [{
      name: 'Joe'
    }, {
      name: 'Bob'
    }],
    tasks: ['wash', 'rinse', 'repeat']
  }, {
    projectName: 'car detailing',
    doneBy: [{
      name: 'Bill'
    }, {
      name: 'Sam'
    }],
    tasks: ['wash', 'rinse', 'repeat']
  }]
```
Will render
```html
<ul>
  <li class="item-template">Project: <b class="projectName">house cleaning</b>
    <ul>
      <li class="doneBy">
        <name>Joe</name>
      </li>
      <li class="doneBy">
        <name>Bob</name>
      </li>
    </ul>
    <tasks>wash</tasks>
    <tasks>rinse</tasks>
    <tasks>repeat</tasks>
  </li>
  <li class="item-template">Project: <b class="projectName">car detailing</b>
    <ul>
      <li class="doneBy">
        <name>Bill</name>
      </li>
      <li class="doneBy">
        <name>Sam</name>
      </li>
    </ul>
    <tasks>wash</tasks>
    <tasks>rinse</tasks>
    <tasks>repeat</tasks>
  </li>
</ul>
```
[JsBin Example](http://jsbin.com/coyemiwupu/edit?html,output)
  
####Attributes
_html, _text, _on[EVENT], _config->context.onunload

to not overwrite an existing attribute use: 

state.name._value = state.name._value + ''

event (e, index, node, data) default context is node

* index is the xpath index of the node -1
* data is the index data of the parent if in a list (map{path,data,node,index})

####Events

Life cycle events in controller:

* willload (event, node, props, instanceID)
* willgetprops (event, node, props, instanceID, nextProps)
* didload (event, node, props, instanceID)
* willupdate (event, node, props, instanceID)
* didupdate (event, node, props, instanceID)
* isupdate (event, node, props, instanceID)
* onbeforeunload  (event, node, props, instanceID, done)
* onunload (event, node, props, instanceID)
* onreload (event, node, props, instanceID)

event.preventDefault() - will skip further execution and call any onunload handlers in the current module (includes inner modules and _config onunloaders that are currently  assigned)

controller -> this.willload 

###Native events: parameters - 
```state.matcher._onclick = function(e, index, node, data)```

* the event
* the x path based 0 index
* the node itself (default context)
* the data of the closest parent list item (In nested lists, the first parent with data).

##Config (DOM hookin)
_config (node, isNew, context, index)

Available on all matchers to hookin to the DOM 

arguments :

* node - the element itself

* isNew is true initially when first run and then is false afterwards

* context is a empty object you can use to pass to itself

   - context.onunload - will be attached to the current modules onunloaders and called if any lifecycle event triggers e.preventDefault()

* index is 0 based on xpath of the matcher

#### Mag.JS AddOns!

Tiny sub library of reusable simple tools can be found [here](https://github.com/magnumjs/mag.js/blob/master/src/mag.addons.0.2.js)

* router
* ajax
* Reusable utilities (copy, merge .. )
* namespace
* hookins


####mag.namespace (String namespace, [Optional object Context])

```javascript
//module library creation with single global namespace / package names
(function(namespace) {
  var mod = {
    controller:function(props){
    },
    view: function(state, props) {
    }
  }
  namespace.CommentBox = mod;
})(mag.namespace('mods.comments'));


var CommentsComponent = mag.create("CommentBox", mag.mod.comments, props);
CommentsComponent();
```

Allows you to easily add new namespaces to your composable components, useful in the module pattern.

[Example of component Module Pattern](http://embed.plnkr.co/iCPpw4NxQEK2ddyqwJ0U/) - [Video tutorial](https://www.youtube.com/watch?v=89TCVe0WyaI)

#### Custom plugins

The ability to register handlers for attribute or value trans compilation.

For example, allow the attribute _className. Register a handler that on every definition will modify both the final attribute name and or the value.

```javascript
mag.hookin('attributes', 'className', function(data) {
  var newClass = data.value
  data.value = data.node.classList + ''
  if (!data.node.classList.contains(newClass)) {
    data.value = data.node.classList.length > 0 ? data.node.classList + ' ' + newClass : newClass
  }
  data.key = 'class'
})
```

The above is in the [MagJS addons library](https://github.com/magnumjs/mag.js/blob/master/src/mag.addons.0.2.js)

**Another example**

Hookin when a specific elementMatcher is not found and return a set of element matches

```javascript
// hookin to create an element if does not exist at the root level
mag.hookin('elementMatcher', 'testme', function(data) {
  // data.key, data.node, data.value

  var fragment = document.createDocumentFragment(),
    el = document.createElement('div');
    
  el.setAttribute('class', data.key)
  fragment.appendChild(el);

  var nodelist = fragment.childNodes;
  data.node.appendChild(fragment)

  data.value = nodelist
})
```

Other hookins such as key/node value!

###[Check out the Hookins](https://github.com/magnumjs/mag.js/blob/master/src/hookins/README.md)

#### Notes

* config attribute won't be called with inner id element matchers, use other element matcher selectors. Fixed in v0.25.5 [Example](http://jsbin.com/qoxuvahake/edit?js,output)

* careful with module instance constructor, can stack overflow if circular reference. Don't call instance from within itself or on state, use separate module. See examples

* object observe support for browsers (v0.22 uses native Proxy to observe)

```html
<script src="//cdn.rawgit.com/MaxArt2501/object-observe/master/dist/object-observe-lite.min.js"></script>
```

* Promise support for IE

```html
<!--[if IE]><script src="https://cdn.rawgit.com/jakearchibald/es6-promise/master/dist/es6-promise.min.js"></script><![endif]-->
```


###Performance
[JSBin - dynamic re-rendering](http://jsbin.com/momuxogicu/edit?output) - [v0.20.7](http://jsbin.com/jayodatiqa/edit?output) - [v0.21.3](http://jsbin.com/sopumorire/edit?output) - [v0.22](http://jsbin.com/sononayaro/edit?output)

[Occlusion culling](http://embed.plnkr.co/gA8SbzIb6hDPmBjYDeYb/preview) - [v0.22](http://embed.plnkr.co/OX88w963dxC6jCZLELoD/)

[JSBin - reversing 1000s of rows](http://jsbin.com/lubimetope/edit?js,output) - [v0.22](http://output.jsbin.com/qacawokejo)

[Dbmon Repaint rate](http://mathieuancelin.github.io/js-repaint-perfs/magjs/) - [v0.23](http://embed.plnkr.co/4wi2bXj2WxeUe27yoXOS/)

[JsPerf v0.20.2](http://jsperf.com/react-vs-raw-dom-manipulation/20) - 
[JsPerf v0.20.2](https://jsperf.com/angular-vs-knockout-vs-ember/758)

[JsPerf v0.20.3](http://jsperf.com/react-vs-raw-dom-manipulation/21) - 
[JsPerf v0.20.3](https://jsperf.com/angular-vs-knockout-vs-ember/759)

[JSPerf v0.14.4](http://jsperf.com/angular-vs-knockout-vs-ember/690)  
<a href="http://jsperf.com/angular-vs-knockout-vs-ember/690"><img src="https://cloud.githubusercontent.com/assets/5196767/9841719/7b46329a-5a71-11e5-8ab2-2f4a1120d949.png"/></a>

[JSPerf v0.14.9](http://jsperf.com/angular-vs-knockout-vs-ember/695)
<a href="http://jsperf.com/angular-vs-knockout-vs-ember/695"><img src="https://cloud.githubusercontent.com/assets/5196767/9858046/62a28128-5aec-11e5-86c0-03bc34268cbc.png"/></a>

[JSPerf v0.15](http://jsperf.com/angular-vs-knockout-vs-ember/694)
<a href="http://jsperf.com/angular-vs-knockout-vs-ember/694"><img src="https://cloud.githubusercontent.com/assets/5196767/9859912/e0e29834-5af6-11e5-8bc1-c9b467d3fd25.png"/></a>

[JSPerf v0.15.1](http://jsperf.com/angular-vs-knockout-vs-ember/700)
<a href="http://jsperf.com/angular-vs-knockout-vs-ember/700"><img src="https://cloud.githubusercontent.com/assets/5196767/9866345/60295bf4-5b2f-11e5-8c51-a73e47c7ac2c.png"/></a>

###Inspired By & cloned from

[Mithril.js](http://lhorie.github.io/mithril/), [Fill.js](https://github.com/profit-strategies/fill),  [React.js](https://facebook.github.io/react/), [Angular.js](https://angularjs.org/), [Fastdom](https://github.com/wilsonpage/fastdom)

// Run each of the following separately in a browser console

// basic principle, function runs in context of owner object -> obj
var obj = {
	log: function() {
		console.log(this)
	}
}
obj.log()

// instantiation: constructors and prototype methods own `this` -> widget
function Widget() {
	console.log('in constructor', this)
}
Widget.prototype.render = function() {
	console.log('rendering', this)
}
var widget = new Widget()
widget.render()

// what about if we don't use the new keyword? -> window
Widget()

// well, because it is the same as -> window
window.Widget = function() {
	console.log('in constructor', this)
}
window.Widget()

// event listeners fire in context of currentTarget -> document
document.addEventListener('click', function(event) {
	console.log(event.currentTarget === this, this)
}, false)

// and what is `this` in the global namespace? -> window
console.log(this)

// and we can run any any context by using call or apply -> document
obj.log.call(document, 0, 1, 2)
obj.log.apply(document, [0, 1, 2])

// we can attach to another object -> obj2
var obj2 = {
	log2: obj.log
}
obj.log2()

// we can use Function.prototype.bind or $.proxy(fn, context) -> document
obj.log3 = obj.log.bind(document)
obj.log3()

// what about Immediately Invoked Function Expression? -> window
(function() {
	console.log(this)
})()

// what about on an obj? -> window
obj.log4 = function() {
	(function() {
		console.log(this)
	})()
}
obj.log4()

// Well, that is kind of weird. So we came up with strict -> undefined
(function() {
	"use strict"
	console.log(this)
})()

// what about on an obj? anonymous functions are always owned by window
obj.log4 = function() {
	"use strict";
	(function() {
		console.log(this)
	})()
}
obj.log4()

// Strict also lets you know when you forget var (which would attach things to window) -> ReferenceError
(function() {
	"use strict"
	foo = 'inner'
	console.log(this)
})()

// what about eval? -> a=inner, this=obj
var a = 'outer'
obj.log5 = function() {
	var a = 'inner'
	eval('console.log(a, this)')
}
obj.log5()

// what about indirect eval? -> a=outer, this=window
var a = 'outer'
obj.log6 = function() {
	var a = 'inner'
	(1, eval)('console.log(a, this)')
}
obj.log6()




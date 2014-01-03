// Run this file from the command line: `node function-context-node.js`

// The global `this` is exports
console.log('global this === exports', this === exports);
console.log('global this === module.exports', this === module.exports);

// Anonymous functions are owned by global
(function() {
	console.log('anonymous this === global', this === global)
})();

// ... unless you use "use strict";
(function() {
	"use strict"
	console.log('anonymous this === undefined', this === undefined)
})();

// Indirect eval produces global
global.a = 'global'
var obj = {
	log: function() {
		var a = 'inner';
		(1, eval)('console.log("indirect eval this === global", this === global)');
		(1, eval)('console.log("indirect eval scope of variables is", a)')
	}
}
obj.log()

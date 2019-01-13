"use strict";

const path = require("path"),
	filo = require(path.join("..", "lib", "tiny-filo.js"));

exports.simple = {
	setUp: function (done) {
		this.cache = filo(4);
		this.items = ["a", "b", "c", "d", "e"];
		done();
	},
	test: function (test) {
		this.items.forEach(i => this.cache.set(i, false));
		test.expect(4);
		test.equal(JSON.stringify(this.cache.order), JSON.stringify(["a", "b", "c", "e"]), `Should be '${JSON.stringify(["a", "b", "c", "e"])}'`);
		test.equal(this.cache.size, 4, "Should be '4'");
		this.cache.evict();
		test.equal(JSON.stringify(this.cache.order), JSON.stringify(["a", "b", "c"]), `Should be '${JSON.stringify(["a", "b", "c"])}'`);
		test.equal(this.cache.size, 3, "Should be '3'");
		test.done();
	}
};

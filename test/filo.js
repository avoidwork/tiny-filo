"use strict";

const path = require("path"),
	filo = require(path.join("..", "lib", "tiny-filo.js"));

exports.evict = {
	setUp: function (done) {
		this.cache = filo(4);
		this.items = ["a", "b", "c", "d", "e"];
		done();
	},
	test: function (test) {
		this.items.forEach(i => this.cache.set(i, false));
		test.expect(6);
		test.equal(this.cache.first.key, "a", "Should be 'a'");
		test.equal(this.cache.last.key, "e", "Should be 'e'");
		test.equal(this.cache.size, 4, "Should be '4'");
		this.cache.evict();
		test.equal(this.cache.first.key, "a", "Should be 'a'");
		test.equal(this.cache.last.key, "c", "Should be 'c'");
		test.equal(this.cache.size, 3, "Should be '3'");
		test.done();
	}
};

exports.deletion = {
	setUp: function (done) {
		this.cache = filo(4);
		this.items = ["a", "b", "c", "d", "e"];
		done();
	},
	test: function (test) {
		this.items.forEach(i => this.cache.set(i, false));
		test.expect(9);
		test.equal(this.cache.first.key, "a", "Should be 'a'");
		test.equal(this.cache.last.key, "e", "Should be 'e'");
		test.equal(this.cache.size, 4, "Should be '4'");
		this.cache.delete("b");
		test.equal(this.cache.first.key, "a", "Should be 'a'");
		test.equal(this.cache.last.key, "e", "Should be 'e'");
		test.equal(this.cache.size, 3, "Should be '3'");
		this.cache.delete("e");
		test.equal(this.cache.first.key, "a", "Should be 'a'");
		test.equal(this.cache.last.key, "c", "Should be 'c'");
		test.equal(this.cache.size, 2, "Should be '2'");
		test.done();
	}
};

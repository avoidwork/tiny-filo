/**
 * Tiny FILO cache for Client or Server
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2019
 * @license BSD-3-Clause
 * @version 1.0.4
 */
"use strict";

(function (global) {
	class FILO {
		constructor (max = 0, ttl = 0) {
			this.first = null;
			this.items = {};
			this.last = null;
			this.max = max;
			this.size = 0;
			this.ttl = ttl;
		}

		has (key) {
			return key in this.items;
		}

		clear () {
			this.first = null;
			this.items = {};
			this.last = null;
			this.size = 0;

			return this;
		}

		delete (key) {
			if (this.has(key)) {
				const item = this.items[key];

				delete this.items[key];
				this.size--;

				if (item.prev !== null) {
					item.prev.next = item.next;
				}

				if (item.next !== null) {
					item.next.prev = item.prev;
				}

				if (this.first === item) {
					this.first = item.next;
				}

				if (this.last === item) {
					this.last = item.prev;
				}
			}

			return this;
		}

		evict () {
			const item = this.last;

			delete this.items[item.key];
			this.last = item.prev;
			this.last.next = null;
			this.size--;
		}

		get (key) {
			let result;

			if (this.has(key)) {
				const item = this.items[key];

				if (this.ttl > 0 && item.expiry >= new Date().getTime()) {
					this.delete(key);
				} else {
					result = item.value;
				}
			}

			return result;
		}

		keys () {
			return Object.keys(this.items);
		}

		set (key, value) {
			if (this.has(key)) {
				const item = this.items[key];

				item.value = value;
			} else {
				if (this.max > 0 && this.size === this.max) {
					this.evict();
				}

				const item = this.items[key] = {
					expiry: this.ttl > 0 ? new Date().getTime() + this.ttl : this.ttl,
					key: key,
					prev: this.last,
					next: null,
					value
				};

				if (++this.size === 1) {
					this.first = item;
					this.last = item;
				} else {
					this.last.next = item;
					this.last = item;
				}
			}

			return this;
		}
	}

	function factory (max = 1000, ttl = 0) {
		return new FILO(max, ttl);
	}

	// Node, AMD & window supported
	if (typeof exports !== "undefined") {
		module.exports = factory;
	} else if (typeof define === "function" && define.amd !== void 0) {
		define(() => factory);
	} else {
		global.filo = factory;
	}
}(typeof window !== "undefined" ? window : global));

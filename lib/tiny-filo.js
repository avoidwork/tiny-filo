/**
 * Tiny FILO cache for Client or Server
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2019
 * @license BSD-3-Clause
 * @version 1.0.0
 */
"use strict";

(function (global) {
	class FILO {
		constructor (max = 0, ttl = 0) {
			this.items = {};
			this.order = [];
			this.max = max;
			this.size = 0;
			this.ttl = ttl;
		}

		has (key) {
			return key in this.items;
		}

		clear () {
			this.items = {};
			this.order.length = 0;
			this.size = 0;
		}

		delete (key, idx = -1) {
			if (this.has(key)) {
				delete this.items[key];
				this.order.splice(idx > -1 ? idx : this.order.indexOf(key), 1);
				this.size--;
			}

			return this;
		}

		evict () {
			const key = this.order.pop();

			delete this.items[key];
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
			return this.order;
		}

		set (key, value) {
			if (this.has(key)) {
				const item = this.items[key];

				item.value = value;
			} else {
				if (this.max > 0 && this.size === this.max) {
					this.evict();
				}

				this.order.push(key);
				this.items[key] = {expiry: this.ttl > 0 ? new Date().getTime() + this.ttl : this.ttl, value};
				this.size++;
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

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

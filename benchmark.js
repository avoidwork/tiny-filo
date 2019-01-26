const path = require("path"),
	filo = require(path.join(__dirname, "lib", "tiny-filo.js")),
	precise = require("precise"),
	nth = 2e3,
	cache = filo(nth),
	data = new Array(nth);

function seed () {
	let i = -1;

	while (++i < nth) {
		data[i] = Math.floor(Math.random() * nth);
	}
}

function populate (arg, start = 0) {
	const nth = arg.max;
	let i = -1;

	while (++i < nth) {
		arg.set(i + start, data[i]);
	}
}

function get (arg, start = 0) {
	const nth = arg.max;
	let i = -1;

	while (++i < nth) {
		arg.get(i + start, data[i]);
	}
}

function bench (n = 0, x = 1, type = "set") {
	if (type === "set") {
		seed();

		const timer = precise().start();

		populate(cache, n);
		timer.stop();

		const f = timer.diff() / 1e6;

		console.log(`Run ${x} ${x === 1 ? "Set" : "Evict"} (${n === 0 ? "Low Keys" : "High Keys"}): ${f} ms (${Math.ceil(nth / f)} ops/ms)`);
	} else if (type === "get") {
		const timer = precise().start();

		get(cache, n);
		timer.stop();

		const f = timer.diff() / 1e6;

		console.log(`Run ${x} Get (${n === 0 ? "Low Keys" : "High Keys"}): ${f} ms (${Math.ceil(nth / f)} ops/ms)`);
	}
}

console.log(`Benchmarking ${nth} items (random value per run)`);
bench();
bench(nth, 2);
bench(void 0, 3);
bench(nth, 4);
bench(nth, 5, "get");

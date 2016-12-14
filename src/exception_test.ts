let h = [];

function add(f) {
	h.push(f);
}
add(async function() {
	throw new Error("catch me!");
});

async function r() {
  try {
  	let f = h[0];
    await f();
  } catch (err) {
    console.log('caught', err);
  }
}

r().then(function() {
	console.log('done!');
});
export const fetcher = (...args) =>
	fetch(...args, {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer " + JSON.parse(sessionStorage.getItem("access_token")),

			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then((res) => {
		// console.log(res.json());

		console.log("data fetch");
		var res = res.json();
		console.log(res);

		return res;
	});

const show = document.getElementById("show");
const dataContainer = document.getElementById("data-container");
const hiddenData = document.getElementById("hidden-data");

document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get({ data: {} }, (result) => {
		const data = result.data
			? Object.fromEntries(
					Object.entries(result.data).sort((a, b) => b[1] - a[1])
			  )
			: {};

		dataContainer.innerHTML = "";
		hiddenData.innerHTML = "";

		let count = 1;

		for (const key in data) {
			const value = data[key];
			const item = document.createElement("div");
			item.textContent = `${count}. ${key}: ${value}`;
			count++;

			count <= 4
				? dataContainer.appendChild(item)
				: hiddenData.appendChild(item);

			if (hiddenData.innerHTML !== "") show.style.display = "flex";
		}
	});
});

document.getElementById("reset").addEventListener("click", () => {
	dataContainer.innerHTML = "";
	hiddenData.innerHTML = "";

	let data = {};
	chrome.storage.sync.set({ data }).then(() => {
		console.log("[INFO] Stats Updated");
	});
});

show.addEventListener("click", () => {
	show.style.display = "none";
	hiddenData.style.display = "block";
});

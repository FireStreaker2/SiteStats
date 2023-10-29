document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get({ data: {} }, (result) => {
		const data = result.data || {};
		const dataContainer = document.getElementById("data-container");

		dataContainer.innerHTML = "";

		for (const key in data) {
			const value = data[key];
			const item = document.createElement("div");
			item.textContent = `${key}: ${value}`;
			dataContainer.appendChild(item);
		}
	});
});

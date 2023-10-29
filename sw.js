chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		let url = new URL(tab.url);
		url = url.host;

		chrome.storage.sync.get({ data: {} }).then((result) => {
			const data = result.data || {};
			console.log(data);

			if (url in data) {
				data[url]++;
			} else {
				data[url] = 1;
			}

			chrome.storage.sync.set({ data }).then(() => {
				console.log("[INFO] Stats Updated");
			});
		});
	}
});

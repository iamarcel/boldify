// eslint-disable-next-line import/no-unassigned-import
import browser from "webextension-polyfill";
import { boldify } from "./content";

// import "./options-storage.js";
browser.action.onClicked.addListener((tab) => {
	browser.scripting.executeScript({
		target: { tabId: tab.id },
		func: boldify,
	});
});

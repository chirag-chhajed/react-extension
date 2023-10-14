export function getActiveTabInfo(): Promise<{
  info: chrome.tabs.Tab;
}> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        if (tabs[0]) {
          const tabId = tabs[0].id;
          // const tabUrl = tabs[0].url;
          if (tabId !== undefined) {
            resolve({ info: tabs[0] });
          } else {
            console.error("Tab ID is undefined.");
            reject();
          }
        } else {
          console.error("No active tab found.");
          reject();
        }
      } else {
        reject();
      }
    });
  });
}

function openPopup() {
  chrome.commands.onCommand.addListener((command) => {
    if (command === "open_popup") {
      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Check if a tab is found before sending the message
        if (tabs.length > 0) {
          // Check if the first tab is defined before sending the message
          if (tabs[0]) {
            // Send a message to the content script to open the popup
            const tabId = tabs[0].id;
            if (tabId !== undefined) {
              chrome.tabs.sendMessage(tabId, { command: "open_popup" });
              // chrome.tabs.sendMessage(tabId, { command: "insert_css" });
            } else {
              console.error("Tab ID is undefined.");
            }
          } else {
            console.error("No active tab found.");
          }
        } else {
          console.error("No active tab found.");
        }
      });
    }
  });
}

function openDashboard() {
  chrome.commands.onCommand.addListener(async (command) => {
    if (command === "open_index") {
      // Get the active tab
      chrome.tabs.create({ url: "index.html" });
    }
  });
}

export { openPopup, openDashboard };

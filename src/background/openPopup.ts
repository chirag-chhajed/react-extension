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

export { openPopup };

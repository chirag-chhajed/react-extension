console.log("Hey I am running from a chrome extension, do you know it");

chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
  if (message.command === "open-popup") {
    console.log("open popup");
  }
});

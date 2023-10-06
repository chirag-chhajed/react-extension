const getBookmarks = () => {
  chrome.permissions.request(
    {
      permissions: ["bookmarks"],
    },
    (granted) => {
      if (granted) {
        chrome.bookmarks.getTree((bookmarkTree) => {
          for (const node of bookmarkTree) {
            console.log(
              node.children?.map((child) =>
                child.children?.map((child) => child.url)
              )
            );
            console.log(
              node.children?.map((child) =>
                child.children?.map((child) => child.url)
              ).length
            );
          }
        });
      } else {
        console.log("Not granted");
      }
    }
  );
};

export { getBookmarks };

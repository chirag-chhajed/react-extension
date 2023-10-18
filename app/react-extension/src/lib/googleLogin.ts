import { GoogleAuthProvider } from "firebase/auth";

const getGoogleAuthCredential = () => {
  return new Promise<ReturnType<typeof GoogleAuthProvider.credential>>(
    (resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          //? If auth doesn't work from getAuthToken api
          try {
            const redirectURL = chrome.identity.getRedirectURL();
            const clientID =
              "240104267874-0b34rikbkjoquq7pj5m4h5uq0csrah4m.apps.googleusercontent.com";
            const scopes = ["email", "profile"];
            let authURL = "https://accounts.google.com/o/oauth2/auth";
            authURL += `?client_id=${clientID}`;
            authURL += `&response_type=token`;
            authURL += `&redirect_uri=${encodeURIComponent(redirectURL)}`;
            authURL += `&scope=${encodeURIComponent(scopes.join(" "))}`;
            chrome.identity.launchWebAuthFlow(
              {
                interactive: true,
                url: authURL,
              },
              (redirect_uri) => {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError.message);
                  reject(chrome.runtime.lastError.message);
                  return;
                }
                const url = new URL(redirect_uri!);
                const id_token = url.hash.split("&")[0].split("=")[1];
                const credential = GoogleAuthProvider.credential(
                  null,
                  id_token
                );
                resolve(credential);
              }
            );
          } catch (error) {
            console.error(error);
            reject(error);
          }
        }
        const credential = GoogleAuthProvider.credential(null, token);
        resolve(credential);
      });
    }
  );
};

export { getGoogleAuthCredential };

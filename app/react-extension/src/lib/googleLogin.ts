import { GoogleAuthProvider } from "firebase/auth";

const getGoogleAuthCredential = () => {
  return new Promise<ReturnType<typeof GoogleAuthProvider.credential>>(
    (resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        // console.log(token, "token");
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        }
        const credential = GoogleAuthProvider.credential(null, token);
        resolve(credential);
      });
    }
  );
};

export { getGoogleAuthCredential };

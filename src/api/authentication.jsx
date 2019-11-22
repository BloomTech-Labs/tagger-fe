export const signIn = () => {
  return window.gapi.auth2
    .getAuthInstance()
    .signIn()
}

export const initGmailClient = (apiKey, clientId) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  // Array of API discovery doc URLs for APIs
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
    "https://people.googleapis.com/$discovery/rest?version=v1"
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  // More info: https://developers.google.com/identity/protocols/googlescopes
  const SCOPES = "https://mail.google.com/ https://www.googleapis.com/auth/contacts"; // Scope for Read, send, delete, and manage your email

  const gapi = window.gapi;

  return gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  });
};

export const checkSignInStatus = () => {  

  return new Promise((resolve, reject) => {
    initGmailClient().then(_ => {
      const gapi = window.gapi;

      const googleAuthInstance = gapi.auth2.getAuthInstance();

      const isSignedIn = googleAuthInstance.isSignedIn.get();
      // console.log(googleAuthInstance, isSignedIn);

      if (isSignedIn) {
        // Listen for sign-in state changes.
        googleAuthInstance.isSignedIn.listen(isSignedIn => {
          updateSigninStatus(isSignedIn);
        });


        console.log("AUTH_SUCCESS from checkSignInStatus");


        resolve(googleAuthInstance.currentUser.Ab);


      } else {
        reject();
      }
    })
      .catch(error => {
        reject(error);
      });
  })

    
  
};

export const sendAuth = () => {
  //Receive an authorization token from Gmail after a user signs in successfully.
  const googleAuthObj = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
  console.log("User ID for backend: ", googleAuthObj);

  //Create a post request and pass the auth token to backend.
  // const cred = new XMLHttpRequest();
  // cred.open('POST', 'https://yourbackend.example.com/tokensignin');
  // cred.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // cred.onload = function() {
  //   console.log('Signed in as: ' + cred.responseText);
  // };
  // cred.send('idtoken=' + id_token);
};

// Listener for sign-in state
export const updateSigninStatus = (isSignedIn) => {
  if (!isSignedIn) {
    // TODO: react to logged out status
  }
};

export const signOut = () => {
  return window.gapi.auth2
    .getAuthInstance()
    .signOut()
};
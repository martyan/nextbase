### <a href="https://nextbase-e74ee.firebaseapp.com/">Demo</a>

### Boilerplate for React developers who wants to quick start a project in NextJS and Firebase

<!--Set-up, build and deploy in 10 minutes-->
<!--Deploy this app in 5 minutes and start developing-->

Build and deploy this boilerplate and start developing your project without need to build the whole infrastructure from scratch

Great for front-end developers, shipped with authentication and basic profile management out of the box


<br /><br />
## Features
- **Server Side Rendering** and **code splitting** out of the box
- **Authentication** - email/password, social sign-in providers, basic profile management
- **To-do list example**


<br /><br />
## Stack
- **Firebase** - Build apps fast, without managing infrastructure (database, storage, hosting, server)
- **NextJS** - A minimalistic framework for universal server-rendered React applications
- **Redux** - A predictable state container for JavaScript

Keeping it minimal so you can choose your tech stack

Thanks to Firebase and NextJS you can scale up as your product grows


<br /><br />
## Firebase set-up
 1. Create a Firebase project using the [Firebase Console](https://console.firebase.google.com).
 2. Add **web** app to project (don't set up hosting).
 3. Copy Firebase config keys
 4. Create `.env` file in the root dir with following content (replacing <your-key> with copied values):
 ```
 FIREBASE_API_KEY=<your-key>
 FIREBASE_AUTH_DOMAIN=<your-key>
 FIREBASE_DATABASE_URL=<your-key>
 FIREBASE_PROJECT_ID=<your-key>
 FIREBASE_STORAGE_BUCKET=<your-key>
 FIREBASE_MESSAGING_SENDER_ID=<your-key>
 FIREBASE_APP_ID=<your-key>
 GOOGLE_ANALYTICS_ID=<your-key>
 ```
 5. Create Firebase database in test mode
 6. Create Firebase storage
 7. In auth section set up email/password sign-in method (for more methods see below)


<br /><br />
## In terminal
 1. Clone or fork this repository.
 1. Install deps `npm install`.
 1. Install Firebase tools `npm install -g firebase-tools`
 1. Login to Firebase `firebase login`
 1. Add Firebase project `firebase use --add` and select your project
 1. Deploy the app `npm run deploy` to Firebase hosting
 1. `npm run dev` to run locally on http://localhost:3000 (Firebase functions must be deployed)

### You're all set - now you can focus on actual coding of your project


<br /><br />
## Social platform sign-in providers
You can add support for social platform sign-in providers easily.

Set it in **Firebase Console** -> **Authentication** -> **Sign-in method**

- [Set up Google sign-in method](https://firebase.google.com/docs/auth/web/google-signin)
- [Set up Facebook sign-in method](https://firebase.google.com/docs/auth/web/facebook-login)


<!--## Sending emails via Gmail-->
<!--To be able to send emails with your Gmail account-->
<!--- enable access to **[Less Secure Apps](https://myaccount.google.com/lesssecureapps)** and **[Display Unlock Captcha](https://accounts.google.com/b/0/DisplayUnlockCaptcha)**-->
<!--- for accounts with 2-step verification enabled **[Generate an App Password](https://support.google.com/accounts/answer/185833)**-->
<!--- set account credentials in terminal:-->
<!--```-->
<!--firebase functions:config:set gmail.email="your@gmail.com" gmail.password="youpassword"-->
<!--```-->


<br /><br />
## Security rules
Guard your data with rules that define who has access to it and how it is structured

### Database (Firestore)
https://firebase.google.com/docs/firestore/security/get-started

### Storage
https://firebase.google.com/docs/storage/security/start

Use rules below to allow only images up to 3 MB
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }

    match /images/{imageId} {
      // Only allow uploads of any image file that's less than 3MB
      allow write: if request.resource.size < 3 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```


<br /><br />
## More read
- [Firebase](https://firebase.google.com/docs/web/setup)
- [NextJS](https://nextjs.org/learn/basics/getting-started)


Nextbase was inspired by [this example](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting)



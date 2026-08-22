# Jinny Coffee — Setup & Fix Notes

## What I added/fixed

1. **`src/App.js` and `src/index.js` were missing.** These are the files that
   actually wire your pages and Navbar/Footer together with routing. Without
   them, nothing was "connected."
2. **`/admin` was public.** Anyone who typed the URL could add, edit, or
   delete your products. I added:
   - `src/context/AuthContext.js` — tracks whether someone is logged in,
     and whether they're an admin.
   - `src/components/PrivateRoute.js` — blocks the Admin page unless the
     logged-in user's email is in the `ADMIN_EMAILS` list.
   - **You must edit `ADMIN_EMAILS` in `src/context/AuthContext.js`** and put
     your real email there (the same one you'll register/login with).
3. **Navbar now reflects real login state** — it shows "Logout" when you're
   signed in, and only shows the "Admin" link to admins.

## Folder structure expected

```
src/
  App.js
  App.css
  index.js
  index.css
  firebase.js
  context/
    AuthContext.js
  components/
    Navbar.js / Navbar.css
    Footer.js / Footer.css
    PrivateRoute.js
  pages/
    Home.js / Home.css
    About.js / About.css
    Services.js / Services.css
    Contact.js / Contact.css
    Login.js / Register.js / Auth.css
    Admin.js / Admin.css
```

If your existing project used a flat `src/` (no `pages`/`components`
subfolders), either move files into these folders, or update the `import`
paths in `App.js` and `Navbar.js` to match your layout.

## Install & run

```bash
npm install
npm start
```

## IMPORTANT — also lock down Firestore itself

Right now, even with the Admin *page* protected, anyone who opens your
browser dev tools could still call Firestore directly and write to the
`products` collection, because your **Firestore security rules** are
probably still in the default "open" test mode.

Go to Firebase Console → Firestore Database → Rules, and use something like:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.auth.token.email in ['admin@jinnycoffee.com'];
    }
  }
}
```

(Match the email to what you set in `ADMIN_EMAILS`.) This is the real,
server-enforced lock — the React-side `PrivateRoute` is just a good UX layer
on top of it, not a substitute for it.

## Other small things worth knowing
- Your Firebase config values (`apiKey`, etc.) in `firebase.js` are safe to
  keep in the code — Firebase client config is meant to be public. Your real
  protection is the Firestore security rules above.
- To create your first admin account: run the app, go to `/register`, sign up
  with the email you put in `ADMIN_EMAILS`, then log in — the Admin link will
  appear in the navbar.

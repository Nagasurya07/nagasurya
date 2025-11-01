Firebase static hosting deploy (Next.js)

This repository is set up for a static export + Firebase Hosting deploy. Because this project uses the `app/` router and may include dynamic behavior, full SSR on Firebase requires a more involved Cloud Functions/Cloud Run setup. These steps create a simple static hosting flow using `next export` which works if your pages are statically renderable.

Quick steps

1) Install the Firebase CLI (if you don't have it) and login:

```powershell
# install as a dev-tool (optional) or use npx
npm install --save-dev firebase-tools
npx firebase login
```

2) Set your Firebase project ID in `.firebaserc` (replace the placeholder):

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

3) Build and export the site to the `out` folder:

```powershell
npm run export
```

4) Deploy to Firebase Hosting:

```powershell
npx firebase deploy --only hosting
# or if you added the npm script
npm run firebase:deploy
```

Notes & caveats

- `next export` only works when pages can be statically exported. If your site uses server-only features, dynamic server rendering, or API routes that are required at runtime, you'll need a hosting + server runtime (Cloud Functions / Cloud Run). I can help configure that if you want SSR on Firebase.

- If you plan to serve the app with SSR on Firebase, the usual approach is to run Next inside Cloud Functions or Cloud Run and use Firebase Hosting rewrite rules to forward requests. That requires a different `firebase.json` and additional setup.

- You must run `npx firebase login` locally to authenticate the deploy session.

If you'd like, I can:
- Try running `npm run export` here and report errors (useful to confirm whether everything is statically exportable), or
- Prepare a Firebas e Hosting + Cloud Run configuration for SSR deployment.

Tell me which option you prefer.
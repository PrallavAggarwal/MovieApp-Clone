# MovieApp-Clone

## Description

I used dummy IMDB data. For persistent storage I used Local storage and also used Firebase for authentication.

This repository contains a simple movie app clone that uses JavaScript, localStorage for persistence, and Firebase for authentication.

## Features

- Browse dummy movie data (IMDB-style)
- Sign in / Sign up using Firebase Authentication
- Persist user selections/preferences in localStorage
- Lightweight JavaScript app

## Prerequisites

- Node.js (v14+ recommended) and npm or yarn
- A Firebase project if you want to enable authentication

## Quick Start (run locally)

1. Clone the repository

   ```
   git clone https://github.com/PrallavAggarwal/MovieApp-Clone.git
   cd MovieApp-Clone
   ```

2. Install dependencies
   - If the project uses npm:

     ```
     npm install
     ```

   - Or with yarn:

     ```
     yarn
     ```

3. Configure Firebase
   - Create a Firebase project at <https://console.firebase.google.com/>
   - Enable the Authentication providers you want (Email/Password, Google, etc.)
   - In your Firebase project settings, get the web app configuration (apiKey, authDomain, projectId, etc.)
   - Add those values to the environment file or config file (see `.env.example` below). Many JS apps expect Firebase vars as REACT*APP*...; adjust according to how the project reads them.

   Example (.env):

   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

   If the repository uses a `firebaseConfig.js` file instead, paste the config object there.

4. Run the app
   - If there is a start script in package.json:

     ```
     npm start
     ```

     or

     ```
     yarn start
     ```

     This usually starts a local dev server at <http://localhost:3000> (or another port shown in the terminal).

   - If the repo is a static site without a dev server, you can serve it with a static server:

     ```
     npx serve .
     ```

     or open `index.html` in a browser (recommended to use a local server to avoid CORS/static file issues).

## Build (if applicable)

- To build a production bundle (if supported by the project):

  ```
  npm run build
  ```

  or

  ```
  yarn build
  ```

## Notes about localStorage

- The app stores user-specific data (for example watchlist or preferences) in localStorage. No additional setup required for this.
- Clearing browser storage will remove saved data.

## Troubleshooting

- If the app fails to start, check for a `package.json` and examine the `scripts` section to see which commands are defined.
- If Firebase auth fails, ensure your Firebase config keys are correct and that Authentication is enabled in the Firebase console.
- Check the browser console for runtime errors and missing env variables.

## Adding Firebase configuration to the repo

- Do NOT commit your real API keys or other secrets to the repository.
- Use an `.env` file (listed in `.gitignore`) or a local `firebaseConfig.js` that you do not commit.
- A `.env.example` is provided to show required variables.

## Contributing

Contributions are welcome. Please open an issue or submit a PR with a clear description of changes.

## License

Add a license to the repo if you want others to reuse the code (e.g., MIT).

## Contact

Repository owner: PrallavAggarwal

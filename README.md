Basic:
    To test run the website, in terminal first navigate to the server folder and run this command: node --env-file=config.env server
    Then open a new terminal, navigate to the client folderr and run this command: npm run dev
    You can then open the website in the browser from port 5173

config.env:
    This is the key to the database, you will need to update this environment file to access the database
    Ask Tom for directions on setting it up locally, you should see a config.env.example in the server directory for how it will look,
    but the info is hidden as it requires a password. So, for safety reasons, ask Tom for directions.

New way to run website:
    - Navigate to server directory
    - type and enter: npm start
    - go to localhost:5050
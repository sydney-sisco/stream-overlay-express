# Stream Overlay

Drag and drop, websockets, timers!

To start the overlay you need a twitch token. You can get one by running the following command:

`twitch token -u -s 'chat:read chat:edit moderator:read:followers'`

Start the app:

`npm run start`

Forward the port with ngrok:

`ngrok http 3000`

## Development

`npm run debug`

Use VSCode debugger (config included in `./vscode`) to attach to the process.

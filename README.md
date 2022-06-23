# Remote Control: RSSchool NodeJS websocket task

> This is a project implementing remote control backend using `RobotJS` library and `websocket`. The front end was provided [here](https://github.com/rolling-scopes-school/remote-control) and accepts commands from the user and sends them to the websocket client, which communicates with the websocket server that handles the commands.
The user can move the cursor (mouse) with arrow keys, get the current coordinates of the cursor, make the cursor draw a circle, square or rectangle, and make a screenshot of the front end computer.

## Installation
1. Clone the repo /download the `develop` branch.
2. Run `npm install` to install all dependencies.

## Usage

**Development**

`npm run start:dev`

* Front-end app is served @ `http://localhost:3000` with ts-node-dev, with websocket server running on http://localhost:8080

**Production**

`npm run start`

* Front-end app is served @ `http://localhost:3000` with node, with websocket server running on http://localhost:8080

---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:3000` with ts-node-dev
`npm run start` | App served @ `http://localhost:3000` with node


## Description

The backend is able to do the following:

- Start the websocket server
- Handle the websocket connection
- Move mouse (Up, Down, Left, Right)
- Draw circle, rectangle and square  
- Send current mouse coordinates
- Send desktop capture

## Technical requirements

- The task is implemented with Typescript
- 16 LTS version of Node.js was used
- Only [ws](https://www.npmjs.com/package/ws), [robotjs](https://www.npmjs.com/package/robotjs), [jimp](https://www.npmjs.com/package/jimp), `typescript` and `ts-node-dev` were used.
- The program is started by npm script `start` in following way:
  - in production mode:
```bash
npm run start
```
  - in development mode:
  ```bash
  npm run start:dev
  ```
- After starting, the program displays websocket parameters
- After the program work is finished, the program ends websocket work correctly  
- After each received command, the program displays the command and results
- All commands are ended with **\0**

List of websocket commands and their syntax (<- - cmd from frontend, -> - answer):
- Navigation over the x and y axis
    - Move mouse up
    ```bash
    <- mouse_up {y px}
    ```
    - Move mouse down
    ```bash
    <- mouse_down {y px}
    ```
    - Move mouse left
    ```bash
    <- mouse_left {x px}
    ```
    - Move mouse right
    ```bash
    <- mouse_right {x px}
    ```
    - Send mouse coordinates
    ```bash
    <- mouse_position
    -> mouse_position {x px},{y px}
    ```
- Drawing
    - Draw circle with pushed left button: 
    ```bash
    <- draw_circle {px}
    ```
    - Draw rectangle with pushed left button: 
    ```bash
    <- draw_rectangle {px} {px}
    ```
    - Draw square with pushed left button: 
    ```bash
    <- draw_square {px}
    ```
- Print screen
    - Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
    ```bash
    <- prnt_scrn
    -> prnt_scrn {base64 string (png buf)}
    ```
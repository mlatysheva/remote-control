# RSSchool NodeJS websocket task template
> Static http server and base task packages.

## Installation
1. Clone/download repo
2. Run `npm install` to install all dependencies

## Usage

**Development**

`npm run start:dev`

* App served @ `http://localhost:8180` with ts-node-dev

**Production**

`npm run start`

* App served @ `http://localhost:8180` with node

---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:8180` with ts-node-dev
`npm run start` | App served @ `http://localhost:8180` with node

# Assignment: Websocket Remote Control

## Description

Your task is to implement remote control backend using `RobotJS` library and websocket.

User interface for your remote control backend is [here](https://github.com/rolling-scopes-school/remote-control)

The backend should be able to do the following:

- Start websocket server
- Handle websocket connection
- Move mouse (Up, Down, Left, Right)
- Draw circle, rectangle and square  
- Send current mouse coordinates
- Send desktop capture (optionally)

## Technical requirements

- The task is implemented with Typescript
- 16 LTS version of Node.js was used
- Only [ws](https://www.npmjs.com/package/ws), [robotjs](https://www.npmjs.com/package/robotjs), [jimp](https://www.npmjs.com/package/jimp), `typescript` and `ts-node-dev` were used.
- The program is started by npm script `start` in following way:
```bash
npm run start 
```
- After starting the program displays websocket parameters
- After program work finished the program ends websocket work correctly  
- After each received command the program displays the command and results
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
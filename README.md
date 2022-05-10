# CHROME-DEBUG-NODE-VNC

# Usage

Look the repository: https://github.com/jvitor83/chrome-debug-node-vnc-usage. Fork and use the `index.js` to write your chrome/puppeteer manipulation.


> Just need a `Dockerfile` with:
>
> ```Dockerfile
> FROM jvitor83/chrome-debug-node-vnc:0.1
> ```
> No need to do COPY and npm install (`ONBUILD` already do that).

## Options:

### Environments

- `extra_chrome_args`


### Ports

- `5900` for VNC
  > [RealVNC recommendation](https://www.realvnc.com/en/connect/download/viewer) - Just connect to `localhost:5900` after start the image exposing the port
- `9222` for chrome remote debug (chrome inside the container)
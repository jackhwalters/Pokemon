## Dependencies ##

- `node >= 16.15.0`
- `docker >= 20.10.17`

## Installation ##
1. `cd` to this directory's root
2. To install npm dependencies
```console
$ npm install
```
4. To run the application
```console
$ node server.js
```
5. If you want to build the docker image
```console
$ docker build --tag pokemon-api .
```
6. Then run this image as a container
```console
$ docker run --publish 5000:5000 pokemon-api
```

## Differences for production API ##

- If `process.env.NODE_ENV === "prod"` errors and warnings are not logged to console, only to the .log files.
- The Dockerfile specifies the npm modules are installed with the `--production` flag to ensure dev dependencies are not installed.
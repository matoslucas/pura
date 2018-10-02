# STRV React Template
[![Build Status](https://travis-ci.com/strvcom/strv-react-template.svg?token=hZyqmmbU5KpVq2eu5YmT&branch=master)](https://travis-ci.com/strvcom/strv-react-template)

[Link to demo](http://purascents-web-development.herokuapp.com/)

### Install
```bash
npm i
```

### Run server + Webpack
```bash
npm run dev
```

## Deployment on Heroku

To get this project to work on Heroku, you need to:

1. `heroku config:set NODE_ENV=production`
2. `heroku config:set NODE_PATH=./src`
3. `heroku config:set NPM_CONFIG_PRODUCTION=false`

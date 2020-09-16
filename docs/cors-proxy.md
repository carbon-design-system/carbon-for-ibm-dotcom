## CORS Proxy

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Available CORS Proxy server for local development](#available-cors-proxy-server-for-local-development)
- [Alternative approach](#alternative-approach)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Overview 

Various components make cross-origin requests to `www.ibm.com`, which will 
require a cors proxy to be configured to make successful calls from a lower 
environment.

A cors proxy can be configured using the following
[environment variable](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/environment-variables.md):

```
CORS_PROXY=https://myproxy.com/
```

or for `create-react-app`:

```
REACT_APP_CORS_PROXY=https://myproxy.com/
```

> NOTE: The `CORS_PROXY` is not necessary when publishing to production
> (www.ibm.com). Be sure to either set `CORS_PROXY` as blank or leave it
> unconfigured when pushing your application to production.

### How It Works

The service call is prepended with the value of `CORS_PROXY`, utilizing a
proxying approach with the following proxy solution:

- [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)

An example call:

`https://myproxy.com/https://www.ibm.com/path/to/translation/file.json` 

### Available CORS Proxy server for local development

Our team has an available cors proxy server that is available for testing on
`localhost:3000` and `localhost:9000`. Reach out to us at #ibm-digital-design
on slack for more information.

### Alternative approach

In lieu of the [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) 
prepending approach, the host for the translation service can also be 
modified via the following environment variable:

```
TRANSLATION_HOST=https://myproxy.com
```

or for `create-react-app`:

```
REACT_APP_TRANSLATION_HOST=https://myproxy.com
```

This will generate the following call:

`https://myproxy.com/path/to/translation/file.json`

instead of

`https://www.ibm.com/path/to/translation/file.json`

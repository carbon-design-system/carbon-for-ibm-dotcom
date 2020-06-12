## CORS Proxy

Various components make cross-origin requests to `www.ibm.com`, which will 
require a cors proxy to be configured to make successful calls from a lower 
environment.

A cors proxy can be configured using the following
[environment variable](https://github.com/carbon-design-system/ibm-dotcom-library/blob/master/packages/react/docs/environment-variables.md):

`CORS_PROXY=https://myproxy.com/`

or for `create-react-app`:

`REACT_APP_CORS_PROXY=https://myproxy.com/`

> NOTE: The `CORS_PROXY` is not necessary when publishing to production
> (www.ibm.com). Be sure to either set `CORS_PROXY` as blank or leave it
> unconfigured when pushing your application to production.

### Available CORS Proxy server for local development

Our team has an available cors proxy server that is available for testing on
`localhost:3000` and `localhost:9000`. Reach out to us at #ibm-digital-design
on slack for more information.

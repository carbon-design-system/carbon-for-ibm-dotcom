<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Using RTL version of CSS](#using-rtl-version-of-css)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Using RTL version of CSS

`@carbon/ibmdotcom-web-components` ships both LTR/RTL versions of CSS modules in 
`lit-element`'s [`css` tagged template](https://lit-element.polymer-project.org/guide/styles#add-styles). 
They have `.css.js` and `.rtl.css.js` extensions, respectively. The Web 
Components modules loads the LTR versions by default, but you can let those 
modules load the RTL versions with a technique called "dependency injection".

[Webpack `NormalModuleReplacementPlugin`](https://webpack.js.org/plugins/normal-module-replacement-plugin/) 
is one of those let you do dependency injection. Below example lets the Web 
Components modules load `.rtl.css.js` whenever our Web Components module tries 
to load `.css.js`:

```javascript
const reCssBundle = /\.css\.js$/i;

...

module.exports = {
  ...
  plugins: [
    ...
    new webpack.NormalModuleReplacementPlugin(reCssBundle, resource => {
      resource.request = resource.request.replace(reCssBundle, '.rtl.css.js');
    }),
  ],
  ...
};
```

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/rtl)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/rtl)

While we recommend using a module bundler by yourself for creating a RTL version 
of bundle optimized fully for your application (it's what above example does), 
you can use our pre-built version e.g. for evaluation purpose. The pre-built 
version can be found at `https://www.ibm.com/common/carbon-for-ibm-dotcom/latest/ibmdotcom-web-components-dotcom-shell.rtl.min.js`.

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/bundle-rtl)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/bundle-rtl)

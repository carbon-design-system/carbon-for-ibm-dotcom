# Enable Right-to-Left (RTL)
<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Setting the `<html dir>` attribute](#setting-the-html-dir-attribute)
- [Enabling RTLCSS](#enabling-rtlcss)
  - [Webpack](#webpack)
  - [Gulp](#gulp)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

Carbon for IBM.com supports right-to-left rendering in all components. However,
in addition to setting the direction (`dir`) attribute in the `<html>` element,
some of our components also utilizes directives from the 
[RTLCSS framework](https://rtlcss.com/). 

## Setting the `<html dir>` attribute

To set the overall document text direction to right-to-left, the following
can be set in the top of the `html` markup:

```html
<html dir="rtl">
```

For more details, read more at [w3c internationalization](https://www.w3.org/International/questions/qa-html-dir).

## Enabling RTLCSS

### Webpack

#### Install `rtlcss`

```bash
$ yarn add rtlcss --dev
```

or 

```bash
$ npm install rtlcss --save-dev
```

#### Add `rtlcss` to webpack config

```
const rtlcss = require('rtlcss');

const enableRtl = true; // this can be set manually, environment variable, etc.

...webpack module rules...
{
  test: /\.scss$/,  
  use: [
    ...other loaders...
    {
      loader: "postcss-loader",
      options: {
        plugins: () => {
          const autoPrefixer = require("autoprefixer")({
            overrideBrowserslist: ["last 1 version", "ie >= 11"],
          });
          return enableRtl
            ? [autoPrefixer, rtlcss]
            : [autoPrefixer];
        },
      },
    },    
  ],
}
...
```

> NOTE: Application configuration settings may vary. This is a reduced
> example of where `rtlcss` can be included in a webpack build 
> configuration

To learn more, visit [RTLCSS: Getting Started](https://rtlcss.com/learn/).

### Gulp

#### Install `gulp-rtlcss`

```bash
$ yarn add gulp-rtlcss --dev
```

or 

```bash
$ npm install gulp-rtlcss --save-dev
```

#### Add `rtlcss` to gulp config

```javascript
const gulp = require('gulp');
const rtlcss = require('gulp-rtlcss');
 
gulp.task('default', function () {
    return gulp.src('styles.css')
        .pipe(rtlcss())
        .pipe(gulp.dest('dist'));
});
```

Visit [gulp-rtlcss](https://github.com/jjlharrison/gulp-rtlcss) for more information.

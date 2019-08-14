# Developing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Naming Convention](#naming-convention)
- [data-autoid](#data-autoid)
- [Examples of Usage](#examples-of-usage)
  - [Selenium Tests](#selenium-tests)
  - [Google Tag Manager](#google-tag-manager)
  - [Tealium](#tealium)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

To assist various teams with tag management, selenium testing, A/B testing,
personalization, etc, we will need to add data attributes to any dynamic 
elements to our HTML markup. This would include input elements and dynamically 
loaded text. The purpose of adding a stable selector language is to provide a
reliable system of accessing elements on the page that will not change due to
possible changes in code (e.g. id's or classnames) that would break campaigns
and automated tests.

## Naming Convention
Based on discussions with the design team, we will look to use BEM as a naming 
convention for the stable selectors. The following is a brief summary on how 
naming is done using BEM: http://getbem.com/naming/.

## data-autoid
We will have the following convention for adding this markup:

```html
<input type="text" data-autoid="block__element--modifier"/>
```

At minimum, components and patterns should include an autoid on the outermost 
element. For example, the `<MastHead />` should output the following markup 
(note, this is not real live markup and is only used as an example):

```html
<header data-autoid="masthead" ...additional attributes...>
  <a href="https://www.ibm.com" data-autoid="masthead__logo">
    <img src="logo.png" />
  </a>
   ...
</header>
```

## Examples of Usage

### Selenium Tests

The QA team will use the following xpath convention for identifying these 
autoid attributes in their tests:

```xpath
//*[@data-autoid="masthead__logo"]
```

### Google Tag Manager
This is an example on the ability to reliably traverse the document object model
within Google Tag Manager:

```bash
function() { var el = {{Find closest}}({{Click Element}}, '[data-autoid^="masthead__logo"]'); return typeof el !== 'undefined' ? el.href : undefined; }
```

### Tealium
// TODO: add section on how to implement with Tealium

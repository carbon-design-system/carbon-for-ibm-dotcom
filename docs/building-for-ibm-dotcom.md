# Building for IBM.com

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Digital data object](#digital-data-object)
- [Page Language](#page-language)
  - [Configuring available languages](#configuring-available-languages)
- [Meta Tags](#meta-tags)
- [IBM.com Tag Management and Site Analytics](#ibmcom-tag-management-and-site-analytics)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

When developing a page on IBM.com, there are several items that will be 
necessary to include in addition to your application code. 

## Digital data object

The Digital Data Object (DDO) is a critical part of any page. It is a flexible, 
customizable collection of metadata that also provides tools and services such 
as live chat and analytics to page authors. All pages require the DDO, but that 
certainly doesn't need to get in the way of development. Get started creating 
your page and add the DDO when you're ready. Some metadata will need to come 
from the page owner, and a full list of properties can be viewed on the 
[Digital Behavior website](https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html).

The standardized/reserved properties of the digitalData object are the 
`page.category` property and `page.pageInfo` children. These are the 
reserved/preset industry standard metadata properties. The `pageInfo.ibm` 
property is ours (IBM) where any and all IBM-specific and custom metadata can 
go.

Below is the digitalData object and properties needed for an IBM.com page with 
sample values. The same rules for required vs. optional metadata, and default 
value vs. omitted tags still apply and haven't changed, metadata is simply in a 
different format/code language. Ensure you change and set the values properly 
for your page:

```html
<script>
  digitalData = {
    page: {
        category: {
            primaryCategory: '' // e.g. SB03
        },
        pageInfo: {
            effectiveDate: '', // e.g. 2014-11-19
            expiryDate: '', // e.g. 2017-11-19
            language: '', // e.g. en-US
            publishDate: '', // e.g. 2014-11-19
            publisher: '', // e.g. IBM Corporation
            version: 'Carbon:IBM.com Library',
            ibm: {
                contentDelivery: '', // e.g. ECM/Filegen
                contentProducer: '', // e.g. ECM/IConS Adopter 34 - GS83J2343G3H3ERG - 11/19/2014 05:14:02 PM
                country: '', // e.g. US
                industry: '', // e.g. B,U
                owner: '', // e.g. Some Person/City/IBM
                siteID: '', // e.g. MySiteID
                subject: '', // e.g. SW492
                type: '' // e.g CT305
            }
        }
    }
  };
</script>
```

## Page Language

The page language is a requirement in order to define what language the current 
page is translated in. 

The primary method of setting the page language is through the `digitalData` 
(DDO) object. The highlighted fields below are necessary:

```html
<script>
  digitalData = {
    page: {
        ...
        pageInfo: {
            ...            
            language: 'en-US',
            ...
            ibm: {
                ...
                country: 'US',
                ...
            }
        }
    }
  };
</script>
```

Alternatively, if the digitalData object is not set, the language will fallback
to fetching from the `lang` attribute in the `<html>` tag on the page:

```html
<html lang="lc-CC">
```

The `lc` is a 2-character ISO language code and `CC` is a 2-character ISO 
country code. For example, to specify that the primary of a Web page is Korean, 
use the following:

```html
<html lang="ko"> or <html lang="ko-KR">
```

For English used in the United Kingdom, specify:

```html
<html lang="en-GB">
```

> Note: The primary language identifier must be written in lower case, while 
the country identifier should be written in uppercase following usual 
conventions.

### Configuring available languages

The available languages are set by the following tags within `<head>`:

```html
<link rel="alternate" hreflang="[language code]-[country code]" href="[redirect link]">
```

For example:

```html
<link rel="alternate" hreflang="en-us" href="https://www.ibm.com/us-en/">
<link rel="alternate" hreflang="en-af" href="https://www.ibm.com/af-en">
<link rel="alternate" hreflang="fr-dz" href="https://www.ibm.com/dz-fr">
...

```

## Meta Tags

These meta tags are required for all IBM.com pages:

```html
<meta charset="UTF-8">
 
<link rel="icon" href="//www.ibm.com/favicon.ico">
 
<meta name="dcterms.date" content="YYYY-MM-DD">
<meta name="dcterms.rights" content="© Copyright IBM Corp. 2016">
    <meta name="geo.country" content="US">
    <meta name="robots" content="index,follow">
```

## IBM.com Tag Management and Site Analytics

It is required to include the common script tag that allows tag management and 
site analytics on all IBM.com pages. The following must be included on every 
page:

```html
<!-- IBM Tag Management and Site Analytics -->
<script src="//1.www.s81c.com/common/stats/ibm-common.js"></script>
```

More details can be found at https://ibm.biz/enable-analytics.

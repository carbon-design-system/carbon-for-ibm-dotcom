# Carbon CDN Style Helpers
<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Overview](#overview)
- [Plex fonts and Carbon reset](#plex-fonts-and-carbon-reset)
- [Carbon grid](#carbon-grid)
- [Carbon theme zoning classes](#carbon-theme-zoning-classes)
  - [Available classes](#available-classes)
  - [Example usage](#example-usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

In order to minimize the necessity of using front-end bundlers with the Carbon 
for IBM.com Web Components CDN artifacts, page level styles artifacts are also
available to use.

If your application is not already compiling its own version of the below 
artifacts, these can be included as part of your project.

> NOTE: The latest/next tags are moving versions. While beneficial to
> always stay on the most recent version, it is recommended to choose a specific
> version and properly test your application when upgrading to a newer version.
> Check for latest version number on [npm](https://www.npmjs.com/package/@carbon/ibmdotcom-web-components).

## Plex fonts and Carbon reset

The following includes Carbon reset, as well as imports Plex fonts necessary for 
the page. Note, this will import `IBM Plex Sans` and `IBM Plex Mono`.

```html
// SPECIFIC VERSION
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/[v1.x.y]/plex.css" />

// LATEST tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css" />

// NEXT tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/next/plex.css" />
```

### Alternative: individual Plex family loading

Plex fonts are also available as CSS artifacts, where the Plex font families can be loaded in individually. 

Available CSS files:

- https://1.www.s81c.com/common/carbon/plex/mono.css
  - https://1.www.s81c.com/common/carbon/plex/mono-bold.css
  - https://1.www.s81c.com/common/carbon/plex/mono-bold-italic.css
  - https://1.www.s81c.com/common/carbon/plex/mono-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/mono-extralight-italic.css
  - https://1.www.s81c.com/common/carbon/plex/mono-italic.css
  - https://1.www.s81c.com/common/carbon/plex/mono-light.css
  - https://1.www.s81c.com/common/carbon/plex/mono-light-italic.css
  - https://1.www.s81c.com/common/carbon/plex/mono-medium.css
  - https://1.www.s81c.com/common/carbon/plex/mono-medium-italic.css
  - https://1.www.s81c.com/common/carbon/plex/mono-regular.css
  - https://1.www.s81c.com/common/carbon/plex/mono-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/mono-semibold-italic.css
  - https://1.www.s81c.com/common/carbon/plex/mono-text.css
  - https://1.www.s81c.com/common/carbon/plex/mono-text-italic.css
  - https://1.www.s81c.com/common/carbon/plex/mono-thin.css
  - https://1.www.s81c.com/common/carbon/plex/mono-thin-italic.css
- https://1.www.s81c.com/common/carbon/plex/sans.css
  - https://1.www.s81c.com/common/carbon/plex/sans-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-bold-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-extralight-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-light-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-medium-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-semibold-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-text-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thin.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thin-italic.css
- https://1.www.s81c.com/common/carbon/plex/sans-arabic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-arabic-thin.css
- https://1.www.s81c.com/common/carbon/plex/sans-condensed.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-bold-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-extralight-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-light-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-medium-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-semibold-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-text-italic.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-thin.css
  - https://1.www.s81c.com/common/carbon/plex/sans-condensed-thin-italic.css
- https://1.www.s81c.com/common/carbon/plex/sans-devanagari.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-devanagari-thin.css
- https://1.www.s81c.com/common/carbon/plex/sans-hebrew.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-hebrew-thin.css
- https://1.www.s81c.com/common/carbon/plex/sans-jp.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-jp-thin.css
- https://1.www.s81c.com/common/carbon/plex/sans-kr.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-kr-thin.css
- https://1.www.s81c.com/common/carbon/plex/sans-thai.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-thin.css
- https://1.www.s81c.com/common/carbon/plex/sans-thai-looped.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-bold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-extralight.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-light.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-medium.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-regular.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-semibold.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-text.css
  - https://1.www.s81c.com/common/carbon/plex/sans-thai-looped-thin.css

And the full plex package (excluding `jp` and `kr`):

- https://1.www.s81c.com/common/carbon/plex/plex-full.css

Example usage:

```html
<html>
<head>
  <link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans.css" />
  <style>
    body {
      font-family: IBM Plex Sans,Helvetica Neue,Arial,sans-serif;
    }
  </style>
  ...
</head>
<body>
...
</body>
</html>
```

### Non-latin dynamic font loader

A dynamic font loader for non-Latin fonts is available, called `load-non-latin-plex`. This utility is
available at the following CDN url:

- https://1.www.s81c.com/common/carbon/plex/load-non-latin-plex.js

Usage:

```html
<script src="https://1.www.s81c.com/common/carbon/plex/load-non-latin-plex.js"></script>
```

Note, this script loads in the font based on the detected 2-character language code in the `window.digitalData` object.

For more details, visit: https://www.ibm.com/standards/carbon/developing/building-for-ibm-dotcom/#page-language


## Carbon grid

The following includes Carbon grid and all corresponding grid classes.

```html
// SPECIFIC VERSION
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/[v1.x.y]/grid.css" />

// LATEST tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/grid.css" />

// NEXT tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/next/grid.css" />
```

[Learn more about the Carbon 2x Grid](https://carbondesignsystem.com/guidelines/2x-grid/overview)

## Carbon theme zoning classes

The following includes classes for creating Carbon theme zones (white, g10, g90, 
g100). Note that these classes take advantage of using CSS Custom Properties enabled
in Carbon.

```html
// SPECIFIC VERSION
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/[v1.x.y]/themes.css" />

// LATEST tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/themes.css" />

// NEXT tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/next/themes.css" />
```

### Available classes

| Theme  | Class name              |
| ------ | ----------------------- |
| white  | `.dds-theme-zone-white` |
| g10    | `.dds-theme-zone-g10`   |
| g90    | `.dds-theme-zone-g90`   |
| g100   | `.dds-theme-zone-g100`  |

### Example usage

```html
<html>
<head>
  <link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/themes.css" />
  <script type="module" src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/dotcom-shell.min.js"></script>
  <script type="module" src="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/leadspace.min.js"></script>
  ...
</head>
<body>
<dds-dotcom-shell-container>
<main>
    <dds-leadspace size="medium" class="dds-theme-zone-g90">
      <dds-leadspace-heading>LeadSpace title</dds-leadspace-heading>
      LeadSpace copy
      <dds-button-group slot="action">
        <dds-button-group-item href="www.example.com">
          Button 1
          <svg 
            focusable="false" 
            preserveAspectRatio="xMidYMid meet" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            aria-hidden="true" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            slot="icon"
          >
            <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
          </svg>
        </dds-button-group-item>
      </dds-button-group>
      <dds-leadspace-image slot="image" class="bx--image" alt="alt text" default-src="https://picsum.photos/id/1076/1056/480">
        <dds-image-item media="(min-width: 672px)" srcset="https://picsum.photos/id/1076/672/400"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="https://picsum.photos/id/1076/320/370"></dds-image-item>
      </dds-leadspace-image>
    </dds-leadspace>  
</main>
</dds-dotcom-shell-container>
</body>
</html>
```

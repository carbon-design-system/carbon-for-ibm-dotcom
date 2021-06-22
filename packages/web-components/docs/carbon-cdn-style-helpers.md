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

> NOTE: The latest/next/beta tags are moving versions. While beneficial to
> always stay on the most recent version, it is recommended to choose a specific
> version and properly test your application when upgrading to a newer version.
> Check for latest version number on [npm](https://www.npmjs.com/package/@carbon/ibmdotcom-web-components).

## Plex fonts and Carbon reset

The following includes Carbon reset, as well as imports Plex fonts necessary for 
the page. 

```html
// SPECIFIC VERSION
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/[v1.x.y]/plex.css" />

// LATEST tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css" />

// NEXT tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/next/plex.css" />

// BETA tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/beta/plex.css" />
```

## Carbon grid

The following includes Carbon grid and all corresponding grid classes.

```html
// SPECIFIC VERSION
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/version/[v1.x.y]/grid.css" />

// LATEST tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/grid.css" />

// NEXT tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/next/grid.css" />

// BETA tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/beta/grid.css" />
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

// BETA tag
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/beta/themes.css" />
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

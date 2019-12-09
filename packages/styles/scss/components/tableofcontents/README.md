### SCSS

#### Usage

Import the package css into the top of your main CSS file.

```css
@import '@carbon/ibmdotcom-styles/scss/components/tableofcontents/index';
```

#### Modifiers

Use these modifiers with `.bx--tableofcontents` class.

| Class                        | Description                           |
| ---------------------------- | ------------------------------------- |
| `.bx--tableofcontents--g100` | The className for dark theme variant. |

#### Elements

| Class                           | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `.bx--tableofcontents__mobile`  | TOC Menu that renders for sm viewport and md viewport |
| `.bx--tableofcontents__desktop` | TOC Menu that renders for lg viewport to max viewport |
| `.bx--tableofcontents__sidebar` | Left side column where table of contents is rendered. |
| `.bx--tableofcontents__content` | Right side column where main content is rendered.     |

#### Blocks

| Class                  | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `.bx--tableofcontents` | Highest level class name for the sticky table of content |

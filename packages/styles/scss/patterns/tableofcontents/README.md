### SCSS

#### Usage

Import the package css into the top of your main CSS file.

```css
@import '@carbon/ibmdotcom-styles/scss/patterns/tableofcontents/index';
```

#### Modifiers

Use these modifiers with `.bx--tableofcontentss` class.

| Class                               | Description                                           |
| ----------------------------------- | ----------------------------------------------------- |
| `.bx--tableofcontents--icon-link`   | The className for simple long form with icon link     |
| `.bx--tableofcontents--card-link`   | The className for simple long form with card link     |
| `.bx--tableofcontents--with-border` | The className for simple long form with border bottom |

#### Elements

| Class                                | Description                                           |
| ------------------------------------ | ----------------------------------------------------- |
| `.bx--tableofcontents__mobile-menu`  | Menu that renders for sm viewport and md viewport     |
| `.bx--tableofcontents__desktop-menu` | Menu that renders for lg viewport to max viewport     |
| `.bx--tableofcontents__sidebar`      | left side column where table of contents is rendered. |
| `.bx--tableofcontents__content`      | right side column where main content is rendered.     |

#### Blocks

| Class                  | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `.bx--tableofcontents` | Highest level class name for the sticky table of content |

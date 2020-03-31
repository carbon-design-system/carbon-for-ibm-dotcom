### SCSS

#### Usage

Import the package css into the top of your main CSS file.

```css
@import '@carbon/ibmdotcom-styles/scss/patterns/sections/leadspace/leadspace';
```

#### Modifiers

Use these modifiers with `.bx--leadspace` class.

| Class                        | Description                                                        |
| ---------------------------- | ------------------------------------------------------------------ |
| `.bx--leadspace--productive` | The className for 'productive' variant which changes title styling |
| `.bx--leadspace--gradient`   | Renders pattern with gradient overlay                              |

#### Elements

| Class                       | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| `.bx--leadspace__image`     | Background image of the lead space pattern (optional)  |
| `.bx--leadspace__container` | Element containing all copy/cta content                |
| `.bx--leadspace__overlay`   | Gradient overlay behind copy content                   |
| `.bx--leadspace__title`     | Required title/heading for the lead space              |
| `.bx--leadspace__content`   | Content holder for optional short description and ctas |
| `.bx--leadspace__desc`      | Optional short description                             |
| `.bx--leadspace__ctas`      | Optional CTA buttons                                   |

#### Blocks

| Class            | Description                                        |
| ---------------- | -------------------------------------------------- |
| `.bx--leadspace` | Highest level class name for the leadspace pattern |

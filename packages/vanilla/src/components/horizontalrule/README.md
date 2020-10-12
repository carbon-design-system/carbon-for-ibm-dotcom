# Horizontal Rule

> The horizontal rule component is to be utilized within IBM.com for thematic
> breaks within the content of the page.

## Getting started

Here's a quick example to get you started:

### ES6 Template Literal

```javascript
import { horizontalruleTemplate } from '@carbon/ibmdotcom-vanilla';
import '@carbon/ibmdotcom-styles/scss/components/horizontalrule/index.scss';

console.log(
  horizontalruleTemplate({
    style: '', // dashed | default
    size: '', // small | medium | large | fluid (default)
    contrast: '', // low | large | medium (default)
    weight: '', // thick | thin (default)
  })
);

// <hr data-autoid="dds--hr" class="bx--hr" />
```

### HTML

```html
<hr data-autoid="dds--hr" class="bx--hr" />

// With options
<hr
  data-autoid="dds--hr"
  class="bx--hr bx--hr--dashed bx--hr--small bx--hr--low-contrast bx--hr--thick"
/>
```

> 💡 Don't forget to import the horizontal rule styles from
> [@carbon/ibmdotcom-styles](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/packages/styles).

## Styles (optional)

| Name              | Class            | Description                                                                    |
| ----------------- | ---------------- | ------------------------------------------------------------------------------ |
| `solid`/`default` | `(no class)`     | Default style variant of the horizontal rule                                   |
| `dashed`          | `bx--hr--dashed` | Dashed/dotted style variant (style is applied in conjuction with `fluid` size) |

## Sizes (optional)

| Name              | Class            | Description                                                         |
| ----------------- | ---------------- | ------------------------------------------------------------------- |
| `fluid`/`default` | `(no class)`     | Default size variant - horizontal rule takes full width of the grid |
| `small`           | `bx--hr--small`  | Shorter fixed-length variant with a max-width of 32px               |
| `medium`          | `bx--hr--medium` | Medium fixed-length variant with a max-width of 48px                |
| `large`           | `bx--hr--large`  | Longer fixed-length variant with a max-width of 64px                |

## Contrast types (optional)

| Name               | Class                   | Description                    |
| ------------------ | ----------------------- | ------------------------------ |
| `medium`/`default` | `(no class)`            | Default contrast color variant |
| `low`              | `bx--hr--low-contrast`  | Lighter contrast color variant |
| `high`             | `bx--hr--high-contrast` | Darker contrast color variant  |

## Weights (optional)

| Name             | Class           | Description                                                                          |
| ---------------- | --------------- | ------------------------------------------------------------------------------------ |
| `thin`/`default` | `(no class)`    | Default weight variant                                                               |
| `thick`          | `bx--hr--thick` | Slightly thicker weight variant (this only applied in conjunction with `fluid` size) |

## Stable selectors

| Name      | Description |
| --------- | ----------- |
| `dds--hr` | Component   |

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the
[Apache 2.0 License](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/master/LICENSE).

# Using server-side template

`@carbon/ibmdotcom-web-components` uses client-side templates by default for masthead, footer, etc.
Optionally, you can use server-side template engines, e.g. [Handlebars](https://handlebarsjs.com), to render them.

The first step is loading the data for the template.
You can use [`@carbon/ibmdotcom-services`](https://www.npmjs.com/package/@carbon/ibmdotcom-services) to load the data:

```javascript
const { default: LocaleAPI } = require('@carbon/ibmdotcom-services/lib/services/Locale/Locale');
const { default: TranslateAPI } = require('@carbon/ibmdotcom-services/lib/services/Translation/Translation');

// This allows to use `@carbon/ibmdotcom-services` in node.js environment
global.sessionStorage = {
  getItem() {
    return '""';
  },
  setItem() {},
};

// Uses IBM.com services to load the data to render the template with
const [langDisplay, translation] = await Promise.all([
  LocaleAPI.getLangDisplay({
    cc: region,
    lc: code,
  }),
  TranslateAPI.getTranslation({
    cc: region,
    lc: code,
  }),
]);

const { footerMenu: footerLinks, footerThin: legalLinks } = translation;

...
```

Once the data is available, leaf components for masthead, footer, etc. can be used, for example:

```handlebars
<dds-footer>
  <dds-footer-logo slot="brand"></dds-footer-logo>
  <dds-footer-nav>
    {{#each footerLinks}}
      <dds-footer-nav-group title-text="{{title}}">
        {{#each links}}
          <dds-footer-nav-item href="{{url}}">{{title}}</dds-footer-nav-item>
        {{/each}}
      </dds-footer-nav-group>
    {{/each}}
  </dds-footer-nav>
  <dds-locale-button slot="locale-button">{{langDisplay}}</dds-locale-button>
  <dds-legal-nav slot="legal-nav">
    {{#each legalLinks}}
      <dds-legal-nav-item href="{{url}}">{{title}}</dds-legal-nav-item>
    {{/each}}
    <dds-legal-nav-cookie-preferences-placeholder></dds-legal-nav-cookie-preferences-placeholder>
  </dds-legal-nav>
</dds-footer>
```

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/handlebars)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/handlebars)

While we recommend building front-end JavaScript/Sass code with a module bundler along with server-side technology like Handlebars (it's what above example does), you can go with completely server-side technology for your quick start, by using our pre-built bundle, like:

```handlebars
<html>
  <head>
    <script type="module">
      // Uses pre-built bundle
      import 'https://www.ibm.com/common/carbon-for-ibm-dotcom/latest/ibmdotcom-web-components-dotcom-shell.min.js';
    </script>
    <style type="text/css">
      /* From: https://github.com/carbon-design-system/carbon/blob/v10.22.0/packages/type/scss/_reset.scss#L31-L32 */
      body {
        font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }

      ...
    </style>
  </head>
  <body>
    ...
    <dds-footer>
      <dds-footer-logo slot="brand"></dds-footer-logo>
      <dds-footer-nav>
        {{#each footerLinks}}
          <dds-footer-nav-group title-text="{{title}}">
            {{#each links}}
              <dds-footer-nav-item href="{{url}}">{{title}}</dds-footer-nav-item>
            {{/each}}
          </dds-footer-nav-group>
        {{/each}}
      </dds-footer-nav>
      ...
    </dds-footer>
    ...
  </body>
</html>
```

> 💡 Check our
> [CodeSandbox](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/bundle-handlebars)
> example implementation.

[![Edit @carbon/ibmdotcom-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/carbon-design-system/carbon-for-ibm-dotcom/tree/master/packages/web-components/examples/codesandbox/usage/bundle-handlebars)

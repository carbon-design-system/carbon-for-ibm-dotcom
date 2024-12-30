1. Rename `README.stories.mdx` -> `[component].mdx` (eg. `callout-quote.mdx`)
  * Storybook 8 doesn’t like `*-story.mdx` or `*.stories.mdx` anymore

2. Rename `[component]-story.ts` -> `[component].stories.ts` (typically already done)
3. In `.storybook/main.ts`, add glob for the new file name, eg.

```
'../src/**/[component].stories.ts',
```

4. Make sure to re-run `yarn start` at this point so it can pick up the filename changes.
5. In the .mdx file, change

```
import { Props } from '@storybook/addon-docs/blocks';
```

To

```
import { ArgTypes } from '@storybook/addon-docs/blocks';
```

Also remove `Story`, and `Preview` imports (unless they are actually used).

Also review imports, and for any *.md imports, append ?raw to the import specifier.

Also change

```
<Props of="cds-[component] />
```

To

```
<ArgTypes of="cds-[component]” />
```

Also change

```
<Description markdown={...} />
```

To 

```
<Markdown>{...}</Markdown>
```


6. In the .ts file
  * Update the mdx import path to:

```
import storyDocs from './[component].mdx';
```

This will be the new “export default” :
```
const meta = {
  title: 'Components/Icon',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
```

Each story is now a JSON, and the new render method is

```
export const Story = {
  name: “Story example”,
  render: ({testArg}) => html`<p>${testArg}</p>`
}
```

Storybook Typescript types are really helpful. This is optional, but strongly recommended:

```aiignore
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';

type Story = StoryObj;
```

Then type your objects to help you. See button/__stories__/button.stories.ts for example.

The rest of the conversion process from knobs to controls is more straightforward after all this, make sure to read the [Controls docs](https://storybook.js.org/docs/essentials/controls) and check out the [Link](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/feat/cwc-storybook-7-vite/packages/carbon-web-components/src/components/link/link.stories.ts) or [Copy button](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/feat/cwc-storybook-7-vite/packages/carbon-web-components/src/components/copy-button/copy-button.stories.ts) stories as a reference.

You can have the main render method in the `meta` variable to avoid repeating the render function in different stories. With this, you can simply pass in different args into the main render template depending on the story.

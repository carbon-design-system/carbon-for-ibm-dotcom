/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import '../index';
import 'carbon-web-components/es/components/tag/tag.js';

const tagTitles = ['Cloud', 'Blockchain', 'Supply chain', 'Watson health', 'IT Infrastructure', 'WebSphere'];

const tagTypeOptions = ['Tag Link', 'Carbon tag'];

export const Default = args => {
  const { tagType } = args ?? {};
  return html`
    <dds-tag-group>
      ${tagTitles.map(title =>
        tagType === tagTypeOptions[0]
          ? html`
              <dds-tag-link href="https://example.com"> ${title} </dds-tag-link>
            `
          : html`
              <bx-tag> ${title} </bx-tag>
            `
      )}
    </dds-tag-group>
  `;
};

export default {
  title: 'Components/Tag group',
  component: 'dds-tag-group',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-16 bx--col-md-6">${story()}</div>
        </div>
      </div>
    `,
  ],
  argTypes: {
    tagType: {
      control: { type: 'select' },
      options: tagTypeOptions,
      defaultValue: tagTypeOptions[0],
    },
    styles: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        TagGroup: {
          tagType: 'Tag Link',
        },
      },
    },
  },
};

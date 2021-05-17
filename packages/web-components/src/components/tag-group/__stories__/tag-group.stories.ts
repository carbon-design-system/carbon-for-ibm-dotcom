/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import readme from './README.stories.mdx';
import '../tag-group';
import textNullable from '../../../../.storybook/knob-text-nullable';

import 'carbon-web-components/es/components/tag/tag';

const tagTitles = ['Cloud', 'Blockchain', 'Supply chain', 'Watson health', 'IT Infrastructure', 'WebSphere'];

export const Default = ({ parameters }) => {
  const { href } = parameters?.props?.TagGroup ?? {};
  return html`
    <dds-tag-group>
      ${tagTitles.map(
        title => html`
          <dds-tag-link href=${ifNonNull(href || undefined)}>
            ${title}
          </dds-tag-link>
        `
      )}
    </dds-tag-group>
  `;
};

export const WithCarbonTag = () => {
  return html`
    <dds-tag-group>
      ${tagTitles.map(
        title => html`
          <bx-tag>
            ${title}
          </bx-tag>
        `
      )}
    </dds-tag-group>
  `;
};

export const Combined = ({ parameters }) => {
  const { href } = parameters?.props?.TagGroup ?? {};
  return html`
    <dds-tag-group>
      ${tagTitles.map(
        title => html`
          <dds-tag-link href=${ifNonNull(href || undefined)}>
            ${title}
          </dds-tag-link>
          <bx-tag>
            ${title}
          </bx-tag>
        `
      )}
    </dds-tag-group>
  `;
};

export default {
  title: 'Components/Tag group',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-16 bx--col-md-6">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      TagGroup: () => ({
        href: textNullable('Tag Link (href)', `https://example.com`),
      }),
    },
  },
};

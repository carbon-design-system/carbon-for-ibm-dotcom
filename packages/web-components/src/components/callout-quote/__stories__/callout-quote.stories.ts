/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../callout-quote';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { copy, sourceHeading, sourceCopy, sourceBottomCopy } = parameters?.props?.CalloutQuote ?? {};
  return html`
    <dds-callout-quote>
      <span slot="copy">
        ${copy}
      </span>
      <span slot="sourceHeading">
        ${sourceHeading}
      </span>
      <span slot="sourceCopy">
        ${sourceCopy}
      </span>
      <span slot="sourceBottomCopy">
        ${sourceBottomCopy}
      </span>
      <dds-link-with-icon slot="footer" href="https://example.com">
        Link with Icon ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-callout-quote>
  `;
};

export default {
  title: 'Components/Callout Quote',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      CalloutQuote: ({ groupId }) => ({
        copy: textNullable(
          'Quote (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
            'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
          groupId
        ),
        sourceHeading: textNullable('Source Heading(sourceHeading)', 'Lorem ipsum dolor sit amet', groupId),
        sourceCopy: textNullable('Source Copy(sourceCopy)', 'consectetur adipiscing elit', groupId),
        sourceBottomCopy: textNullable('Source Copy(sourceBottomCopy)', 'IBM Cloud', groupId),
      }),
    },
    decorators: [
      story => html`
        <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
          <div class="bx--row">
            <div class="bx--offset-lg-4 bx--col-lg-12">
              ${story()}
            </div>
          </div>
        </div>
      `,
    ],
  },
};

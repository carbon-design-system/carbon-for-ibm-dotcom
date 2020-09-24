/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import '../quote';
import '../../link-with-icon/link-with-icon';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import textNullable from '../../../../.storybook/knob-text-nullable';

import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { copy, quoteMark, sourceHeading, sourceCopy, sourceBottomCopy } = parameters?.props?.Quote ?? {};
  return html`
    <dds-quote inverse="false" markType="${quoteMark}">
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
      <dds-link-with-icon slot="cta" href="https://example.com">
        Link with Icon ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-quote>
  `;
};

const types = {
  singleCurved: 'singleCurved',
  doubleCurved: 'doubleCurved',
  doubleAngle: 'doubleAngle',
  singleAngle: 'singleAngle',
  lowHighReversedDoubleCurved: 'lowHighReversedDoubleCurved',
};

export default {
  title: 'Components/Quote',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-8 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      Quote: ({ groupId }) => ({
        copy: textNullable(
          'Quote (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ' +
            'ornare rhoncus sem. Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.',
          groupId
        ),
        quoteMark: select('Quote Mark (markType):', types, types.doubleCurved, groupId),
        sourceHeading: textNullable('Source Heading(sourceHeading)', 'Lorem ipsum dolor sit amet', groupId),
        sourceCopy: textNullable('Source Copy(sourceCopy)', 'consectetur adipiscing elit', groupId),
        sourceBottomCopy: textNullable('Source Copy(sourceBottomCopy)', 'IBM Cloud', groupId),
      }),
    },
  },
};

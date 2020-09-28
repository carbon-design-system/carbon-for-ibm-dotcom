/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../callout-data';
import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  console.log(parameters);
  const { data, copy, source } = parameters?.props?.CalloutData?.props ?? {};

  return html`
    <div class="bx--grid" style="width: 100%">
      <div class="bx--row">
        <div class="bx--offset-lg-3 bx--col-lg-9">
          <dds-callout-data>
            <span slot="data">${data}</span>
            <span slot="copy">
              ${copy}
            </span>
            <span slot="source">
              ${source}
            </span>
          </dds-callout-data>
        </div>
      </div>
    </div>
  `;
};

export default {
  title: 'Components/Callout Data',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      CalloutData: ({ groupId }) => ({
        props: {
          data: textNullable('Data (data):', '51%', groupId),
          copy: textNullable(
            'Short copy (copy):',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
              ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            groupId
          ),
          source: textNullable(
            'Source (source):',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            groupId
          ),
        },
      }),
    },
  },
};

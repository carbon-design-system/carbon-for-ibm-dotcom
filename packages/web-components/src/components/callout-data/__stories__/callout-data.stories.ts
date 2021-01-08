/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../callout-data';
import '../callout-data-copy';
import '../callout-data-heading';
import '../callout-data-source';
import readme from './README.stories.mdx';
import { DDS_CALLOUT_DATA } from '../../../globals/internal/feature-flags';

export const Default = !DDS_CALLOUT_DATA
  ? undefined
  : ({ parameters }) => {
      const { data, copy, source } = parameters?.props?.CalloutData?.props ?? {};

      return html`
        <dds-callout-data>
          <dds-callout-data-heading>${data}</dds-callout-data-heading>
          <dds-callout-data-copy>
            ${copy}
          </dds-callout-data-copy>
          <dds-callout-data-source>
            ${source}
          </dds-callout-data-source>
        </dds-callout-data>
      `;
    };

export default !DDS_CALLOUT_DATA
  ? undefined
  : {
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
        decorators: [
          story => html`
            <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
              <div class="bx--row dds-ce-demo-devenv--grid-row">
                <div class="bx--offset-lg-3 bx--col-lg-9">
                  ${story()}
                </div>
              </div>
            </div>
          `,
        ],
      },
    };

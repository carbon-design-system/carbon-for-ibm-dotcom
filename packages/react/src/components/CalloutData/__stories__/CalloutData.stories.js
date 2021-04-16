/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CalloutData from '../CalloutData';
import { DDS_CALLOUT_DATA } from '../../../internal/FeatureFlags';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default !DDS_CALLOUT_DATA
  ? undefined
  : {
      title: 'Components|Callout data',
      parameters: {
        ...readme.parameters,
        knobs: {
          CalloutData: ({ groupId }) => ({
            props: {
              data: text('Data (data):', '51%', groupId),
              copy: text(
                'Short copy (copy):',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                groupId
              ),
              source: text(
                'Source (source):',
                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                groupId
              ),
            },
          }),
        },
      },
    };

export const Default = !DDS_CALLOUT_DATA
  ? undefined
  : ({ parameters }) => {
      let data;
      if (parameters.props.CalloutData.props.data.includes('%20')) {
        data = parameters.props.CalloutData.props.data
          .split('%20')
          .map(elem => `${elem} `)
          .join('');
      } else {
        data = parameters.props.CalloutData.props.data;
      }
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--offset-lg-4 bx--col-lg-12">
              <CalloutData
                {...parameters.props.CalloutData.props}
                data={data}
              />
            </div>
          </div>
        </div>
      );
    };

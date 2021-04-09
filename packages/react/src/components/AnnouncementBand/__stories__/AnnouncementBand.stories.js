/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AnnouncementBand from '../AnnouncementBand';

import { boolean } from '@storybook/addon-knobs';
import customData from './data/customData.js';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|AnnouncementBand',

  parameters: {
    ...readme.parameters,
    knobs: {
      useMockData: boolean('Use mock data', true),
    },
    percy: {
      skip: true,
    },
    proxy: true,
  },
};

export const Default = ({ parameters }) => (
  <AnnouncementBand
    customData={parameters.knobs.useMockData ? customData : null}
  />
);

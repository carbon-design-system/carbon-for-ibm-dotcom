/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import initStoryshots from '@storybook/addon-storyshots';
import { mount } from 'enzyme';
import path from 'path';

// Mocking ResizeObserver to avoid CI error where it appears to be undefined
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

/**
 * This will initialize storyshots for snapshot testing.
 * NOTE: If a molecule/organism requires deeper testing, a __tests__ folder must be created in the corresponding folder
 * and create additional tests in there.
 */
initStoryshots({
  renderer: mount,

  /* configuration options */
  configPath: path.resolve(__dirname, '../../.storybook'),

  // Ignore stories with "skip" in the storiesOf text value
  storyKindRegex: /^((?!.*?skip).)*$/,
});

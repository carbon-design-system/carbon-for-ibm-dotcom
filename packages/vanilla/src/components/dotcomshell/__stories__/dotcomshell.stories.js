/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../../styles/scss/components/dotcom-shell/_dotcom-shell.scss';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import content from './data/content';
import { createElement } from 'react';
import { Description } from '@storybook/addon-docs/blocks';
import DotcomShell from '../dotcomshell';
import mastheadKnobs from '../../masthead/__stories__/data/Masthead.stories.knobs.js';
import readme from '../README.md';

export default {
  title: 'Components|Dotcom Shell',
  decorators: [withKnobs],

  parameters: {
    docs: {
      page: () => createElement(Description, { markdown: readme }),
    },
  },
};

export const Default = () => {
  const footerTypeOptions = {
    default: 'default',
    short: 'short',
  };

  const dotcomShellProps = {
    masthead: {
      navigation: select(
        'Navigation',
        mastheadKnobs.navigation,
        mastheadKnobs.navigation.default
      ),
      platform: select(
        'Platform name',
        mastheadKnobs.platform,
        mastheadKnobs.platform.none
      ),
      hasNavigation: boolean('Has navigation', true),
      hasProfile: boolean('Has profile', true),
      searchProps: {
        hasSearch: boolean('Has search', true),
        placeHolderText: text('Search placeholder', 'Search all of IBM'),
        searchOpenOnoad: false,
      },
    },
    footer: {
      footerType: select(
        'Footer',
        footerTypeOptions,
        footerTypeOptions.default
      ),
    },
  };

  /**
   * renders the dotcom shell
   *
   * @returns {string} string
   */
  async function _getDotcomShell() {
    const template = await DotcomShell.getDotcomShellWithData({
      content,
      ...dotcomShellProps,
    });

    return template;
  }

  const dotcomshellContainer = document.createElement('div');
  dotcomshellContainer.textContent = 'Loading...';
  _getDotcomShell().then(html => {
    dotcomshellContainer.innerHTML = html;
    DotcomShell.init(dotcomshellContainer);
  });

  return dotcomshellContainer;
};

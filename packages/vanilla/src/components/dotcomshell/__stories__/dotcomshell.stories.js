/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import mastheadKnobs from '../../masthead/__stories__/data/Masthead.stories.knobs.js';
import DotcomShell from '../dotcomshell';
import content from './data/content';

import './index.scss';

// import readme from '../README.md';

storiesOf('Dotcom Shell', module)
  .addDecorator(withKnobs)
  .addParameters({})
  .add('Default', () => {
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
          'Type',
          footerTypeOptions,
          footerTypeOptions.tall
        )
      }
    };

    /**
     * renders the dotcom shell
     *
     * @returns {string} string
     */
    async function _getDotcomShell() {
      const template = await DotcomShell.getDotcomShellWithData({content, ...dotcomShellProps});

      return template;
    }

    const dotcomshellContainer = document.createElement('div');
    dotcomshellContainer.textContent = 'Loading...';
    _getDotcomShell().then(html => {
      dotcomshellContainer.insertAdjacentHTML('afterbegin', html);
      DotcomShell.init(dotcomshellContainer);
    });

    return dotcomshellContainer;
  });

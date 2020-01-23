/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
// import dotcomshell from '../dotcomshell.template';
import { Masthead } from '../../masthead';
import { Footer } from '../../footer';
import mastheadKnobs from '../../masthead/__stories__/data/Masthead.stories.knobs.js';
import content from './data/content';
import wrapper from './templates/wrapper.template';
// import readme from '../README.md';

storiesOf('Dotcom Shell', module)
  .addDecorator(withKnobs)
  .addParameters({})
  .add('Default', () => {
    const footerTypeOptions = {
      default: 'default',
      short: 'short',
    };

    const dotcomshellProps = {
      searchProps: {
        hasSearch: boolean('Has search', true),
        placeHolderText: text('Search placeholder', 'Search all of IBM'),
        searchOpenOnoad: false,
      },
    };
    /**
     * renders either short or the tall footer
     *
     * @returns {string} string
     */
    async function _getFooter() {
      const template = await Footer.getFooterWithData(
        select('type', footerTypeOptions, footerTypeOptions.tall)
      );

      return template;
    }

    const footer = document.createElement('div');
    footer.textContent = 'Loading...';
    _getFooter().then(html => {
      footer.innerHTML = html;
      Footer.init(footer);
    });

    /**
     * renders the masthead
     *
     * @returns {string} string
     */
    async function _getMasthead() {
      const template = await Masthead.getMastheadWithData(
        select(
          'Navigation',
          mastheadKnobs.navigation,
          mastheadKnobs.navigation.default
        ),
        select(
          'Platform name',
          mastheadKnobs.platform,
          mastheadKnobs.platform.none
        ),
        boolean('Has navigation', true),
        boolean('Has profile', true),
        dotcomshellProps.searchProps
      );

      return template;
    }

    const masthead = document.createElement('div');
    masthead.textContent = 'Loading...';
    _getMasthead().then(html => {
      masthead.innerHTML = html;
      Masthead.init();
    });

    return wrapper({
      masthead,
      content,
    });
  });

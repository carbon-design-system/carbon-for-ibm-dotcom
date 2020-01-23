/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import Masthead from '../masthead';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import '../../../../../styles/scss/components/masthead/index.scss';
import readme from '../README.md';

storiesOf('masthead', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const standardProps = {
      searchProps: {
        hasSearch: boolean('Has search', true),
        placeHolderText: text('Search placeholder', 'Search all of IBM'),
        searchOpenOnload: boolean('Search open on load', false),
      },
    };

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
        standardProps.searchProps
      );

      return template;
    }

    const element = document.createElement('div');
    element.textContent = 'Loading...';
    _getMasthead().then(html => {
      element.innerHTML = html;
      Masthead.init();
    });
    return element;
  });

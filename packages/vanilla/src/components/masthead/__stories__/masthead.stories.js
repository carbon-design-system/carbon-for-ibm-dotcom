/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../../styles/scss/components/masthead/index.scss';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import Masthead from '../masthead';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import readme from '../README.md';

export default {
  title: 'Components|Masthead',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const standardProps = {
    searchProps: {
      hasSearch: boolean('Has search', true),
      placeHolderText: text('Search placeholder', 'Search all of IBM'),
      searchOpenOnload: false,
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
};

export const SearchOpenByDefault = () => {
  const standardProps = {
    searchProps: {
      hasSearch: boolean('Has search', true),
      placeHolderText: text('Search placeholder', 'Search all of IBM'),
      searchOpenOnload: true,
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
};

SearchOpenByDefault.story = {
  name: 'Search open by default',
};

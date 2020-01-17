/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/html';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Masthead from '../masthead';
import '../../../../../styles/scss/components/masthead/index.scss';
import readme from '../README.md';

const searchProps = {
  hasSearch: true,
  placeHolderText: 'Search all of IBM',
  searchOpenOnload: true,
};

storiesOf('masthead', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const standardProps = {
      hasProfile: boolean('Has profile', true),
      searchProps: boolean('Has search', searchProps.hasSearch),
    };

    /**
     * renders the masthead
     *
     * @returns {string} string
     */
    async function _getMasthead() {
      const template = await Masthead.getMastheadWithData(
        standardProps.hasProfile,
        searchProps
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

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../../../../styles/scss/components/footer/index.scss';
import { select, withKnobs } from '@storybook/addon-knobs';
import { createElement } from 'react';
import { Description } from '@storybook/addon-docs/blocks';
import Footer from '../footer';
import readme from '../README.md';

export default {
  title: 'Components|Footer',
  decorators: [withKnobs],

  parameters: {
    docs: {
      page: () => createElement(Description, { markdown: readme }),
    },
  },
};

export const Default = () => {
  const footerTypeOptions = {
    tall: '',
    short: 'short',
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

  const element = document.createElement('div');
  element.textContent = 'Loading...';
  _getFooter().then(html => {
    element.innerHTML = html;
    Footer.init(element);
  });
  return element;
};

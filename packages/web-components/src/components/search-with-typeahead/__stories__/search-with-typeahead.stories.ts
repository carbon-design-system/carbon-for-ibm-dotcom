/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import readme from './README.stories.mdx';

export const Default = () => html`
  <dds-search-with-typeahead> </dds-search-with-typeahead>
`;

export const Alternate = () => html`
  <dds-search-with-typeahead leadspace-search> </dds-search-with-typeahead>
`;

export default {
  title: 'Components/Search with typeahead',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};

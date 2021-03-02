/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import '../back-to-top';
import readme from './README.stories.mdx';
import StoryContent from '../../dotcom-shell/__stories__/data/content';

export const Default = () => {
  return html`
    <div>
      ${StoryContent()}
      <dds-back-to-top></dds-back-to-top>
    </div>
    <div data-autoid="dds--footer">footer</div>
  `;
};

export default {
  title: 'Components/Back to top',
  parameters: {
    ...readme.parameters,
  },
};

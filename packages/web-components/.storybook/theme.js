/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from '@storybook/theming';
import packageJson from '../package.json';

export default create({
  base: 'light',
  brandTitle: `Carbon for IBM.com Web Components v${packageJson.version}`,
  brandUrl:
    'https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/web-components',
  fontBase: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
  fontCode:
    '"IBM Plex Mono", Menlo, "DejaVu Sans Mono", "Bitstream Vera Sans Mono", Courier, monospace',
});

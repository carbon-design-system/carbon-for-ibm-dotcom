/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DDSBackToTop from '@carbon/ibmdotcom-web-components/es/components-react/back-to-top/back-to-top';
import React from 'react';
import readme from './README.stories.react.mdx';
import '../../dotcom-shell/dotcom-shell-container';

export const Default = () => {
  return (
    <dds-dotcom-shell-container>
      <main>
        <section className="bx--grid" style={{ paddingTop: '6rem', height: '220rem', position: 'relative' }}>
          <p>scroll down</p>
        </section>
        <DDSBackToTop />
      </main>
    </dds-dotcom-shell-container>
  );
};

export default {
  title: 'Components/Back to top',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
};

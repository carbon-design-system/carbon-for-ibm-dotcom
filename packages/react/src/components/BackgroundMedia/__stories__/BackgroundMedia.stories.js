/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|Background media',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    proxy: true,
  },
};

export const Default = () => {
  return (
    <p>
      This component is maintained in{' '}
      <code>@carbon/ibmdotcom-web-components</code> library with a{' '}
      <a
        className="bx--link"
        target="_blank"
        href="https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components-react/?path=/story/components-background-media">
        React wrapper
      </a>
      .
    </p>
  );
};

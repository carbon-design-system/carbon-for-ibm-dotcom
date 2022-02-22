/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components/Tag group',
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
        href="https://www.ibm.com/standards/carbon/web-components/react/?path=/story/components-tag-group">
        React wrapper
      </a>
      .
    </p>
  );
};

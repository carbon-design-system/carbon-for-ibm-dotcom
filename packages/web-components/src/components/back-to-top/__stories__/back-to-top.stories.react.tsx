/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSBackToTop from '@carbon/ibmdotcom-web-components/es/components-react/back-to-top/back-to-top';
import React from 'react';
import readme from './README.stories.react.mdx';
import styles from './back-to-top.stories.scss';
import Content from './data/content.tsx';

export const Default = () => {
  return (
    <>
      {Content()}
      <DDSBackToTop />
    </>
  );
};

Default.story = {};

export default {
  title: 'Components/Back to top',
  decorators: [
    story => {
      const classes = classnames('bx--content dds-ce-demo-devenv--ui-shell-content');
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className={classes}>{story()}</div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
};

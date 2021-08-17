/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSBackToTop from '@carbon/ibmdotcom-web-components/es/components-react/back-to-top/back-to-top';
// @ts-ignore
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
// @ts-ignore
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
// @ts-ignore
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
// @ts-ignore
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
// @ts-ignore
import React from 'react';
import readme from './README.stories.react.mdx';

export const Default = () => {
  return (
    <>
      <DDSLeadspace type="centered">
        <DDSLeadspaceHeading>Back to Top component demo</DDSLeadspaceHeading>
        The Back to Top component is designed to appear after the user scrolls the distance equals to current screen height.
        <DDSButtonGroup slot="action">
          <DDSButtonGroupItem aria-label="Scroll down" href="#">
            Scroll down
            <ArrowDown20 slot="icon" />
          </DDSButtonGroupItem>
        </DDSButtonGroup>
      </DDSLeadspace>
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

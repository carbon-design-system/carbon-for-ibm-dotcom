/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Error20 from '@carbon/icons-react/es/error/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = args => {
  const { disabled, href, heading, copy } = args?.CardLink ?? {};
  return (
    <DDSCardLink disabled={disabled} href={href || undefined}>
      <DDSCardLinkHeading>{heading}</DDSCardLinkHeading>
      {copy ? <p>{copy}</p> : ''}
      <DDSCardFooter disabled={disabled}> {disabled ? <Error20 slot="icon" /> : <ArrowRight20 slot="icon" />} </DDSCardFooter>
    </DDSCardLink>
  );
};

Default.story = {
  parameters: {
    knobs: {
      CardLink: () => ({
        disabled: boolean('Disabled (disabled):', false),
        href: textNullable('Card href (href):', 'https://example.com'),
        heading: textNullable('Card heading (heading):', 'Explore AI use cases in all industries'),
        copy: textNullable('Card copy (copy):', ''),
      }),
    },
  },
};

export default {
  title: 'Components/Card link',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">{story()}</div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};

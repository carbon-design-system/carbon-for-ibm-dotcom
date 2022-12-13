/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Error20 from '@carbon/icons-react/es/error/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCardLink, {
  PropTypesRef,
} from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import readme from './README.stories.react.mdx';

export const Default = args => {
  const { disabled, href, heading, copy } = args;

  const copyNode = document.querySelector('dds-card-link p p');
  if (copyNode) {
    (copyNode as HTMLElement).innerText = copy;
  }

  return (
    <DDSCardLink disabled={disabled} href={href || undefined}>
      <DDSCardLinkHeading>{heading}</DDSCardLinkHeading>
      {copy ? <p>{copy}</p> : ''}
      <DDSCardFooter disabled={disabled}>
        {' '}
        {disabled ? <Error20 slot="icon" /> : <ArrowRight20 slot="icon" />}{' '}
      </DDSCardFooter>
    </DDSCardLink>
  );
};

export default {
  title: 'Components/Card link',
  component: PropTypesRef,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    href: {
      control: { type: 'text' },
      defaultValue: 'https://example.com',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Explore AI use cases in all industries',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: '',
    },
    hreflang: {
      table: {
        disable: true,
      },
    },
    ping: {
      table: {
        disable: true,
      },
    },
    rel: {
      table: {
        disable: true,
      },
    },
    target: {
      table: {
        disable: true,
      },
    },
    linkRole: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    'link-role': {
      table: {
        disable: true,
      },
    },
    border: {
      table: {
        disable: true,
      },
    },
    'color-scheme': {
      table: {
        disable: true,
      },
    },
    'pictogram-placement': {
      table: {
        disable: true,
      },
    },
    download: {
      table: {
        disable: true,
      },
    },
    logo: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    colorScheme: {
      table: {
        disable: true,
      },
    },
    pictogramPlacement: {
      table: {
        disable: true,
      },
    },
    eyebrow: {
      table: {
        disable: true,
      },
    },
    image: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
              {story()}
            </div>
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

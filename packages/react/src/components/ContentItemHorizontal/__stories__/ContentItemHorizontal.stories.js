/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text } from '@storybook/addon-knobs';
import ContentItemHorizontal from '../ContentItemHorizontal';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|ContentItemHorizontal',

  parameters: {
    ...readme.parameters,
    knobs: {
      ContentItemHorizontal: ({ groupId }) => ({
        eyebrow: text('Eyebrow', 'Lorem ipsum', groupId),
        heading: text('Heading', 'Aliquam condimentum', groupId),
        copy: text(
          'Copy',
          'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
          groupId
        ),
        cta: {
          items: object(
            'link list items array',
            [
              {
                type: 'local',
                copy: 'Learn more',
                cta: {
                  href: 'https://ibm.com',
                },
              },
              {
                type: 'external',
                copy: 'Microservices and containers',
                cta: {
                  href: 'https://ibm.com',
                },
              },
            ],
            groupId
          ),
        },
      }),
    },
    props: {
      ContentItemHorizontal: {
        eyebrow: 'Lorem ipsum',
        heading: 'Aliquam condimentum',
        copy:
          'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, cta } =
    parameters?.props?.ContentItemHorizontal ?? {};

  return (
    <div className="bx--grid bx--content-group-story">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <ContentItemHorizontal
            eyebrow={eyebrow}
            heading={heading}
            copy={copy}
            cta={cta}
          />
        </div>
      </div>
    </div>
  );
};

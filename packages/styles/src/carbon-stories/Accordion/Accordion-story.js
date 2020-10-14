/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { Accordion, AccordionItem, AccordionSkeleton, Button } from 'carbon-components-react';

const props = {
  onClick: action('onClick'),
  onHeadingClick: action('onHeadingClick'),
};

export default {
  title: 'Accordion',
  decorators: [withKnobs],
};

export const Default = () => (
  <Accordion>
    <AccordionItem
      title={text('The title (title)', 'Section 1 title')}
      open={boolean('Open the section (open)', false)}
      {...props}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 2 title" {...props}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 3 title" {...props}>
      <Button>This is a button.</Button>
    </AccordionItem>
    <AccordionItem
      title={
        <span>
          Section 4 title (<em>the title can be a node</em>)
        </span>
      }
      {...props}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </AccordionItem>
  </Accordion>
);

Default.story = {
  parameters: {
    info: {
      text: `
        Accordions allow users to expand and collapse sections of content.
      `,
    },
  },
};

/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { ButtonGroup } from '../../ButtonGroup';
import { ExpressiveModal } from '../';
import { ModalBody } from 'carbon-components-react';
import React from 'react';
import readme from '../README.stories.mdx';

/**
 * Dummy content for the modal story
 *
 * @returns {object} JSX object
 */
function StoryContent({ title, paragraph, button }) {
  return (
    <div>
      {title ? <h1 style={{ marginBottom: '16px' }}>{title}</h1> : null}
      {paragraph ? <p style={{ marginBottom: '48px' }}>{paragraph}</p> : null}
      {button ? (
        <ButtonGroup
          buttons={[
            {
              href: '',
              copy: button,
              renderIcon: ArrowRight20,
            },
          ]}
        />
      ) : null}
    </div>
  );
}

const props = {
  ExpressiveModal: () => ({
    open: boolean('Toggle modal', true),
  }),
  Other: () => ({
    title: text('Title (placeholder)', 'Lorem ipsum dolor sit amet'),
    paragraph: text(
      'Paragraph (placeholder)',
      'Quisque felis odio, egestas vel tempus iaculis, interdum vel eros. Phasellus pharetra, purus et pretium posuere, ipsum risus pulvinar leo, non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec tincidunt eros. Fusce sollicitudin sit amet quam eu fringilla. Donec tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed nisl dui, scelerisque et augue eget, pharetra commodo elit. In venenatis sapien eu nisl congue suscipit.'
    ),
    button: text('Button (placeholder)', 'Lorem ipsum dolor'),
  }),
};

export default {
  title: 'Components/Expressive modal',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    percy: {
      name: 'Components|Expressive modal: Default',
    },
  },
};

export const Default = () => {
  const { open } = props?.ExpressiveModal() ?? {};
  const { title, paragraph, button } = props?.Other() ?? {};
  return (
    <ExpressiveModal open={open} className="bx--modal--expressive">
      <ModalBody>
        <StoryContent title={title} paragraph={paragraph} button={button} />
      </ModalBody>
    </ExpressiveModal>
  );
};

export const Expanded = () => {
  const { open } = props?.ExpressiveModal() ?? {};
  const { title, paragraph, button } = props?.Other() ?? {};
  return (
    <ExpressiveModal
      open={open}
      fullwidth={true}
      className="bx--modal--expressive"
    >
      <ModalBody>
        <StoryContent title={title} paragraph={paragraph} button={button} />
      </ModalBody>
    </ExpressiveModal>
  );
};

Expanded.story = {
  parameters: {
    percy: {
      name: 'Components|Expressive modal: Expanded',
    },
  },
};

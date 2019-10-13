import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import '../../../../../styles/scss/components/dotcom-modal/index.scss';

import DotcomModal from '../DotcomModal';

storiesOf('DotcomModal', module)
  .addDecorator(withKnobs)
  .addParameters({})
  .add('Default', () => {
    const modalAriaLabel = text(
      'ARIA label, used only if modalLabel not provided (modalAriaLabel)',
      'A label to be read by screen readers on the modal root node'
    );

    const modalLabel = text('Modal label', 'Modal label');

    const modalHeading = text('Modal heading', 'Modal heading');

    const modalContent = text(
      'Modal content',
      'Please see ModalWrapper for more examples and demo of the functionality.'
    );

    const modalCloseDescription = text('Close icon description', 'Close modal');

    const buttons = {
      none: null,
      dotcomButtons: [
        {
          link: '',
          copy: 'Secondary action button',
          renderIcon: 'ArrowRight',
        },
        {
          link: '',
          copy: 'Primary action button',
          renderIcon: 'ArrowRight',
        },
      ],
    };

    return (
      <DotcomModal
        open={boolean('Open', true)}
        onBlur={boolean('Close on blur', true)}
        passiveModal={boolean('Passive modal (Carbon buttons)', true)}
        modalAriaLabel={modalAriaLabel}
        modalLabel={modalLabel}
        modalHeading={modalHeading}
        iconDescription={modalCloseDescription}
        dotcomButtons={select('Dotcom Modal Buttons', buttons, buttons.none)}>
        <div className="bx--modal-content__inner">
          <p>{modalContent}</p>
        </div>
      </DotcomModal>
    );
  });

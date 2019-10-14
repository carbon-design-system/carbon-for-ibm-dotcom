import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Button } from 'carbon-components-react';
import '../../../../../styles/scss/components/dotcom-modal/index.scss';
import { Globe16 } from '@carbon/icons-react';

import LocaleSelector from '../LocaleSelector';

storiesOf('LocaleSelector', module)
  .addDecorator(withKnobs)
  .addParameters({})
  .add('Default', () => {
    const modalAriaLabel = text(
      'ARIA label, used only if modalLabel not provided (modalAriaLabel)',
      'A label to be read by screen readers on the modal root node'
    );

    const modalLabel = text('Modal label', 'United States – English');
    const modalLabelIcon = <Globe16 />;

    const modalHeading = text(
      'Modal heading',
      'We’re sorry, this page is not available from your location.'
    );

    const modalContent = text(
      'Modal content',
      'We’ve directed you to the IBM worldwide page in English. You can always '
    );

    const modalCloseDescription = text('Close icon description', 'Close modal');

    const buttons = [
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
    ];

    return (
      <>
        <Button>Show modal</Button>
        <LocaleSelector
          open={boolean('Open', true)}
          onBlur={boolean('Close on blur', true)}
          passiveModal={true}
          modalAriaLabel={modalAriaLabel}
          modalLabel={[modalLabel, modalLabelIcon]}
          modalHeading={modalHeading}
          iconDescription={modalCloseDescription}
          dotcomButtons={buttons}>
          <p>
            {modalContent} <a href="#">try another location</a>
          </p>
        </LocaleSelector>
      </>
    );
  });

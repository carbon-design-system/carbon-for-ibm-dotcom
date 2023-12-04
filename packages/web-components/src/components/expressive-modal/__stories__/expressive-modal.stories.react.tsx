/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// @ts-ignore
/* eslint-disable max-len */
import C4DExpressiveModal from '../../../../es/components-react/expressive-modal/expressive-modal.js';
import C4DExpressiveModalHeader from '../../../../es/components-react/expressive-modal/expressive-modal-header.js';
import C4DExpressiveModalCloseButton from '../../../../es/components-react/expressive-modal/expressive-modal-close-button.js';
import C4DExpressiveModalHeading from '../../../../es/components-react/expressive-modal/expressive-modal-heading.js';
import C4DExpressiveModalBody from '../../../../es/components-react/expressive-modal/expressive-modal-body.js';
import C4DExpressiveModalFooter from '../../../../es/components-react/expressive-modal/expressive-modal-footer.js';
import C4DButton from '../../../../es/components-react/button/button.js';
import { action } from '@storybook/addon-actions';
import { EXPRESSIVE_MODAL_SIZE } from '../defs';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const sizes = {
  [`Regular size`]: null,
  [`One that takes full width (${EXPRESSIVE_MODAL_SIZE.FULL_WIDTH})`]:
    EXPRESSIVE_MODAL_SIZE.FULL_WIDTH,
};

export const Default = (args) => {
  const { open, disableClose, size, onBeforeClose, onClose } =
    args?.Modal ?? {};
  const { buttonContent } = args.Other;
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <C4DExpressiveModal
      open={open}
      expressive-size={size}
      onBeforeClose={handleBeforeClose}
      onClosed={onClose}>
      <C4DExpressiveModalHeader>
        <C4DExpressiveModalCloseButton></C4DExpressiveModalCloseButton>
        <C4DExpressiveModalHeading>Modal Title</C4DExpressiveModalHeading>
      </C4DExpressiveModalHeader>
      <C4DExpressiveModalBody>
        Quisque felis odio, egestas vel tempus iaculis, interdum vel eros.
        Phasellus pharetra, purus et pretium posuere, ipsum risus pulvinar leo,
        non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec
        tincidunt eros. Fusce sollicitudin sit amet quam eu fringilla. Donec
        tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi
        laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed
        nisl dui, scelerisque et augue eget, pharetra commodo elit. In venenatis
        sapien eu nisl congue suscipit.
      </C4DExpressiveModalBody>
      <C4DExpressiveModalFooter>
        <C4DButton href="https://www.example.com">
          {buttonContent} <ArrowRight20 slot="icon" />
        </C4DButton>
      </C4DExpressiveModalFooter>
    </C4DExpressiveModal>
  );
};

export default {
  title: 'Components/Expressive modal',
  parameters: {
    ...readme.parameters,
    knobs: {
      Modal: () => ({
        open: boolean('Open (open)', true),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in cds-expressive-modal-beingclosed event)',
          false
        ),
        size: select('Modal size (size)', sizes, null),
        onBeforeClose: action('cds-expressive-modal-beingclosed'),
        onClose: action('cds-expressive-modal-closed'),
      }),
      Other: () => ({
        buttonContent: textNullable('Button content', 'Lorem ipsum dolor'),
      }),
    },
    propsSet: {
      default: {
        Modal: {
          open: true,
          disableClose: false,
          size: null,
          onBeforeClose: 'cds-expressive-modal-beingclosed',
          onClose: 'cds-expressive-modal-closed',
        },
        Other: {
          buttonContent: 'Lorem ipsum dolor',
        },
      },
    },
  },
};

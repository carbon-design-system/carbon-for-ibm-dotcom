/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
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
import DDSExpressiveModal from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal';
import DDSExpressiveModalHeader from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-header';
import DDSExpressiveModalCloseButton from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-close-button';
import DDSExpressiveModalHeading from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-heading';
import DDSExpressiveModalBody from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-body';
import DDSExpressiveModalFooter from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-footer';
import DDSButtonExpressive from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import { action } from '@storybook/addon-actions';
import { EXPRESSIVE_MODAL_SIZE } from '../defs';
import readme from './README.stories.react.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const sizes = {
  [`Regular size`]: null,
  [`One that takes full width (${EXPRESSIVE_MODAL_SIZE.FULL_WIDTH})`]: EXPRESSIVE_MODAL_SIZE.FULL_WIDTH,
};

export const Default = args => {
  const { open, disableClose, size, onBeforeClose, onClose } = args?.Modal ?? {};
  const { buttonContent } = args;
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <DDSExpressiveModal open={open} expressive-size={size} onBeforeClose={handleBeforeClose} onClosed={onClose}>
      <DDSExpressiveModalHeader>
        <DDSExpressiveModalCloseButton></DDSExpressiveModalCloseButton>
        <DDSExpressiveModalHeading>Modal Title</DDSExpressiveModalHeading>
      </DDSExpressiveModalHeader>
      <DDSExpressiveModalBody>
        Quisque felis odio, egestas vel tempus iaculis, interdum vel eros. Phasellus pharetra, purus et pretium posuere, ipsum
        risus pulvinar leo, non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec tincidunt eros. Fusce
        sollicitudin sit amet quam eu fringilla. Donec tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi
        laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed nisl dui, scelerisque et augue eget, pharetra
        commodo elit. In venenatis sapien eu nisl congue suscipit.
      </DDSExpressiveModalBody>
      <DDSExpressiveModalFooter>
        <DDSButtonExpressive>
          {buttonContent} <ArrowRight20 slot="icon" />
        </DDSButtonExpressive>
      </DDSExpressiveModalFooter>
    </DDSExpressiveModal>
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
          'Disable user-initiated close action (Call event.preventDefault() in dds-expressive-modal-beingclosed event)',
          false
        ),
        size: select('Modal size (size)', sizes, null),
        onBeforeClose: action('dds-expressive-modal-beingclosed'),
        onClose: action('dds-expressive-modal-closed'),
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
          onBeforeClose: 'dds-expressive-modal-beingclosed',
          onClose: 'dds-expressive-modal-closed',
        },
        Other: {
          buttonContent: 'Lorem ipsum dolor',
        },
      },
    },
  },
};

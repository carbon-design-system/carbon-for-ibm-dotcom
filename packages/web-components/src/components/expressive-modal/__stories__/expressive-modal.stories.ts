/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import '../../../internal/vendor/@carbon/web-components/components/button/button.js';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { EXPRESSIVE_MODAL_SIZE } from '../defs';
import '../index';
import '../../button/button';
import styles from './expressive-modal.stories.scss';
import readme from './README.stories.mdx';

const sizes = {
  [`Regular size`]: null,
  [`One that takes full width (${EXPRESSIVE_MODAL_SIZE.FULL_WIDTH})`]:
    EXPRESSIVE_MODAL_SIZE.FULL_WIDTH,
};

export const Default = (args) => {
  const { open, disableClose, size, onBeforeClose, onClose } =
    args?.Modal ?? {};
  const { buttonContent } = args?.Other ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <dds-expressive-modal
      ?open="${open}"
      expressive-size="${ifNonNull(size)}"
      @dds-expressive-modal-beingclosed="${handleBeforeClose}"
      @dds-expressive-modal-closed="${onClose}">
      <dds-expressive-modal-header>
        <dds-expressive-modal-close-button></dds-expressive-modal-close-button>
        <dds-expressive-modal-heading>Modal Title</dds-expressive-modal-heading>
      </dds-expressive-modal-header>
      <dds-expressive-modal-body>
        Quisque felis odio, egestas vel tempus iaculis, interdum vel eros.
        Phasellus pharetra, purus et pretium posuere, ipsum risus pulvinar leo,
        non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec
        tincidunt eros. Fusce sollicitudin sit amet quam eu fringilla. Donec
        tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi
        laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed
        nisl dui, scelerisque et augue eget, pharetra commodo elit. In venenatis
        sapien eu nisl congue suscipit.
      </dds-expressive-modal-body>
      <dds-expressive-modal-footer>
        <dds-button-expressive>
          ${buttonContent}${ArrowRight20({ slot: 'icon' })}
        </dds-button-expressive>
      </dds-expressive-modal-footer>
    </dds-expressive-modal>
  `;
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

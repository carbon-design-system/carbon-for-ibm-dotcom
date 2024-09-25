/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { EXPRESSIVE_MODAL_SIZE } from '../defs';
import '../index';
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
    <c4d-expressive-modal
      ?open="${open}"
      expressive-size="${ifDefined(size)}"
      @c4d-expressive-modal-beingclosed="${handleBeforeClose}"
      @c4d-expressive-modal-closed="${onClose}">
      <c4d-expressive-modal-header>
        <c4d-expressive-modal-close-button></c4d-expressive-modal-close-button>
        <c4d-expressive-modal-heading>Modal Title</c4d-expressive-modal-heading>
      </c4d-expressive-modal-header>
      <c4d-expressive-modal-body>
        Quisque felis odio, egestas vel tempus iaculis, interdum vel eros.
        Phasellus pharetra, purus et pretium posuere, ipsum risus pulvinar leo,
        non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec
        tincidunt eros. Fusce sollicitudin sit amet quam eu fringilla. Donec
        tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi
        laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed
        nisl dui, scelerisque et augue eget, pharetra commodo elit. In venenatis
        sapien eu nisl congue suscipit.
      </c4d-expressive-modal-body>
      <c4d-expressive-modal-footer>
        <c4d-button href="https://www.example.com">
          ${buttonContent}${ArrowRight20({ slot: 'icon' })}
        </c4d-button>
      </c4d-expressive-modal-footer>
    </c4d-expressive-modal>
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
          'Disable user-initiated close action (Call event.preventDefault() in c4d-expressive-modal-beingclosed event)',
          false
        ),
        size: select('Modal size (size)', sizes, null),
        onBeforeClose: action('c4d-expressive-modal-beingclosed'),
        onClose: action('c4d-expressive-modal-closed'),
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
          onBeforeClose: 'c4d-expressive-modal-beingclosed',
          onClose: 'c4d-expressive-modal-closed',
        },
        Other: {
          buttonContent: 'Lorem ipsum dolor',
        },
      },
    },
  },
};

/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import 'carbon-web-components/es/components/button/button';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../button/button';
import { DDS_MODAL_SIZE } from '../modal';
import '../modal-header';
import '../modal-heading';
import '../modal-close-button';
import '../modal-body';
import '../modal-footer';
import styles from './modal.stories.scss';
import readme from './README.stories.mdx';

const sizes = {
  [`Regular size`]: null,
  [`One that takes full width (${DDS_MODAL_SIZE.FULL_WIDTH})`]: DDS_MODAL_SIZE.FULL_WIDTH,
};

export const Default = ({ parameters }) => {
  const { open, disableClose, expressiveSize, onBeforeClose, onClose } = parameters?.props?.['dds-modal'] ?? {};
  const { buttonContent } = parameters?.props?.Other ?? {};
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
    <dds-modal
      ?open="${open}"
      expressive-size="${ifNonNull(expressiveSize)}"
      @dds-modal-beingclosed="${handleBeforeClose}"
      @dds-modal-closed="${onClose}"
    >
      <dds-modal-header>
        <dds-modal-close-button></dds-modal-close-button>
        <dds-modal-heading>Modal Title</dds-modal-heading>
      </dds-modal-header>
      <dds-modal-body>
        Quisque felis odio, egestas vel tempus iaculis, interdum vel eros. Phasellus pharetra, purus et pretium posuere, ipsum
        risus pulvinar leo, non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec tincidunt eros. Fusce
        sollicitudin sit amet quam eu fringilla. Donec tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi
        laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed nisl dui, scelerisque et augue eget, pharetra
        commodo elit. In venenatis sapien eu nisl congue suscipit.
      </dds-modal-body>
      <dds-modal-footer>
        <dds-btn>
          ${buttonContent}${ArrowRight20({ slot: 'icon' })}
        </dds-btn>
      </dds-modal-footer>
    </dds-modal>
  `;
};

export default {
  title: 'Components/Modal',
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-modal': ({ groupId }) => ({
        open: boolean('Open (open)', true, groupId),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in dds-modal-beingclosed event)',
          false,
          groupId
        ),
        expressiveSize: select('Modal size (expressiveSize)', sizes, null, groupId),
        onBeforeClose: action('dds-modal-beingclosed'),
        onClose: action('dds-modal-closed'),
      }),
      Other: ({ groupId }) => ({
        buttonContent: textNullable('Button content', 'Lorem ipsum dolor', groupId),
      }),
    },
  },
};

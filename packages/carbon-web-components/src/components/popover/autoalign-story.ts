/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import './popover';
import './popover-content';
import { POPOVER_ALIGNMENT } from './defs';
import storyDocs from './popover-story.mdx';
import { prefix } from '../../globals/settings';
import Checkbox16 from '@carbon/icons/lib/checkbox/16';
import Information16 from '@carbon/icons/lib/information/16';

import styles from './popover-story.scss';

const popoverAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-left`]: POPOVER_ALIGNMENT.TOP_LEFT,
  [`top-right`]: POPOVER_ALIGNMENT.TOP_RIGHT,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-left`]: POPOVER_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: POPOVER_ALIGNMENT.BOTTOM_RIGHT,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-bottom`]: POPOVER_ALIGNMENT.LEFT_BOTTOM,
  [`left-top`]: POPOVER_ALIGNMENT.LEFT_TOP,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-bottom`]: POPOVER_ALIGNMENT.RIGHT_BOTTOM,
  [`right-top`]: POPOVER_ALIGNMENT.RIGHT_TOP,
};

export const Popover = (args) => {
  const { caret, highContrast, align, dropShadow } =
    args?.[`${prefix}-popover`] ?? {};

  const handleClick = (id) => {
    const popover = document.querySelector(id);
    const open = popover?.hasAttribute('open');
    open ? popover?.removeAttribute('open') : popover?.setAttribute('open', '');
  };
  return html`
    <style>
      ${styles}
    </style>
    <div style="height:100%">
      <div class="auto-align-1">
        <div
          id="auto-align-1"
          class="playground-trigger"
          @click="${() => handleClick('#popover-one')}">
          ${Checkbox16()}
        </div>
        <cds-popover
          id="popover-one"
          autoAlign
          ?caret=${caret}
          ?highContrast=${highContrast}
          align=${align}
          ?dropShadow=${dropShadow}
          triggerId="auto-align-1">
          <div class="p-3">
            <p class="popover-title">Available storage</p>
            <p class="popover-details">
              This server has 150 GB of block storage remaining.
            </p>
          </div>
        </cds-popover>
      </div>
    </div>
  `;
};

Popover.storyName = 'Popover';

Popover.parameters = {
  knobs: {
    [`${prefix}-popover`]: () => ({
      caret: boolean('caret (caret)', true),
      highContrast: boolean('high contrast (highContrast)', false),
      align: select(
        'Align (align)',
        popoverAlignments,
        popoverAlignments.bottom
      ),
      dropShadow: boolean('drop shadow (dropShadow)', true),
    }),
  },
};

export const ToggleTip = (args) => {
  const { align } = args?.[`${prefix}-toggletip`] ?? {};

  return html`
    <div style="overflow:hidden; background: gray; width: 300px; height: 300px">
      <div
        style="display: flex;
      align-items: center;
      justify-content: center;
      outline: none;">
        <cds-toggletip-label>Toggletip label</cds-toggletip-label>
        <cds-toggletip-button id="button-1">
          ${Information16({ id: 'trigger' })}</cds-toggletip-button
        >
      </div>
      <cds-toggletip triggerId="button-1" autoAlign alignment=${align}>
        <p slot="body-text">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <cds-link slot="actions">Test</cds-link>
        <cds-button slot="actions">Button</cds-button>
      </cds-toggletip>
    </div>
  `;
};

ToggleTip.storyName = 'Toggletip';

ToggleTip.parameters = {
  knobs: {
    [`${prefix}-toggletip`]: () => ({
      align: select(
        'Align (align)',
        popoverAlignments,
        popoverAlignments.bottom
      ),
    }),
  },
};

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Experimental/Auto Align',
};

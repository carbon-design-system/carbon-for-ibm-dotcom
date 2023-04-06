/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select, text, number } from '@storybook/addon-knobs';
import './index';
import '../button/index';
import storyDocs from './icon-button-story.mdx';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import Edit16 from '@carbon/icons/lib/edit/16';
import { ICON_BUTTON_SIZE } from './defs';

const tooltipAlignments = {
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

export const Default = () => {
  return html`
    <cds-icon-button> ${Edit16({ slot: 'icon' })} </cds-icon-button>
  `;
};

export const Playground = (args) => {
  const {
    alignment,
    defaultOpen,
    disabled,
    tooltipContent,
    enterDelay,
    exitDelay,
    size,
  } = args?.['cds-icon-button'];
  return html`
    <cds-icon-button
      align=${alignment}
      ?defaultOpen=${defaultOpen}
      ?disabled=${disabled}
      enterDelay=${enterDelay}
      exitDelay=${exitDelay}
      size=${size}>
      ${Edit16({ slot: 'icon' })}
      <slot slot="tooltip-content"> ${tooltipContent} </slot>
    </cds-icon-button>
  `;
};

Playground.parameters = {
  knobs: {
    'cds-icon-button': () => ({
      alignment: select(
        'Tooltip alignment to trigger button (alignment)',
        tooltipAlignments,
        POPOVER_ALIGNMENT.TOP
      ),
      defaultOpen: boolean('Default open (defaultOpen)', false),
      disabled: boolean('Disabled (disabled)', false),
      enterDelay: number('Enter delay (in ms)', 100),
      exitDelay: number('Exit delay (in ms)', 300),
      tooltipContent: text('tooltip-content', 'Custom label'),
      size: select('size', ICON_BUTTON_SIZE, ICON_BUTTON_SIZE.MEDIUM),
    }),
  },
};

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Components/Icon Button',
  decorators: [(story) => html`<div style="padding: 3rem">${story()}</div>`],
};

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import './toggletip';
import '../button';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import storyDocs from './toggletip-story.mdx';
import Checkbox16 from '@carbon/icons/lib/checkbox/16';
import Information16 from '@carbon/icons/lib/information/16';
import View16 from '@carbon/icons/lib/view/16';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16';
import Folders16 from '@carbon/icons/lib/folders/16';

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
const iconList = {
  [`information`]: Information16,
  [`view`]: View16,
  [`folder open`]: FolderOpen16,
  [`folders`]: Folders16,
};
export const Default = (args) => {
  
  const { alignment, icon, bodyText } = args?.[`${prefix}-toggletip`] ?? {};
  console.log(icon);
  
  return html`
    <cds-toggletip alignment="${ifDefined(alignment)}" hasCustomIcon>
      Toggletip label
      <span slot="icon"> ${icon({ id: 'trigger' })} </span>
      <p slot="body-text">${bodyText}</p>
      <cds-link slot="actions">Test</cds-link>
      <cds-button slot="actions">Button</cds-button>
    </cds-toggletip>
  `;
};

Default.parameters = {
  knobs: {
    [`${prefix}-toggletip`]: () => ({
      alignment: select(
        'Toggletip alignment to trigger button (alignment)',
        tooltipAlignments,
        POPOVER_ALIGNMENT.BOTTOM
      ),
      icon: select('Toggletip icon', iconList, Information16),
      bodyText: textNullable(
        'Toggletip content (bodyText)',
        `Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.`
      ),
    }),
  },
};

export default {
  title: 'Components/Toggletip',
  parameters: {
    ...storyDocs.parameters,
  },
};

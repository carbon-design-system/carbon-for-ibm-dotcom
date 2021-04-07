/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../tabs-extended';
import '../tab';

export const Default = ({ parameters }) => {
  const { copy } = parameters?.props?.TabsExtended ?? {};
  return html`
    <dds-tabs-extended>
      <dds-tab label="Lorem">
        Maecenas faucibus mollis interdum.
      </dds-tab>
      <dds-tab label="Ipsum">
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
      </dds-tab>
      <dds-tab label="Dolor" selected="true">
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
      </dds-tab>
      <dds-tab label="Sit" disabled="true">
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </dds-tab>
    </dds-tabs-extended>
  `;
};

Default.story = {
  parameters: {
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--tabs-extended',
  },
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    (story, { parameters }) => html`
      <div class="dds-ce-demo-devenv--simple-grid ${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasVerticalSpacingInComponent: true,
    hasGrid: true,
    knobs: {
      TabsExtended: () => ({
        copy: textNullable(
          'Copy (copy):',
          'Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. ' +
            'Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin.'
        ),
      }),
    },
  },
};

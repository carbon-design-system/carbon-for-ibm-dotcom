/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, select, text } from '@storybook/addon-knobs';
import React from 'react';

// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DVideoCTAContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/video-cta-container';
import readme from './README.stories.react.mdx';
import { CTA_TYPE } from '../../cta/defs';

import {
  hrefsForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

export const Default = (args) => {
  const { buttons } = args?.ButtonGroup ?? {};

  return (
    <C4DVideoCTAContainer>
    <C4DButtonGroup>
      {buttons.map(elem => (
        <C4DButtonGroupItem href={hrefsForType[elem.ctaType]} cta-type={elem.ctaType}>
          {elem.copy}
        </C4DButtonGroupItem>
      ))}
    </C4DButtonGroup>
    </C4DVideoCTAContainer>
  );
};

Default.story = {
  parameters: {
    knobs: {
      ButtonGroup: () => ({
        buttons: Array.from({
          length: number('Number of buttons', 2, {}),
        }).map((_, i) => ({
          copy: text(`Button ${i + 1}`, `Button ${i + 1}`),
          ctaType: select(
            `CTA type (cta-type) ${i + 1}`,
            typeOptions,
            types[CTA_TYPE.LOCAL]
          ),
        })),
      }),
    },
  },
};

export default {
  title: 'Components/Button group',
  decorators: [
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-sm-16 cds--col-md-6 cds--col-lg-16">
              {story()}
            </div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};

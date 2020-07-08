/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { number, select, text } from '@storybook/addon-knobs';
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import ButtonGroup from '../ButtonGroup';
import Pdf20 from '@carbon/icons-react/es/PDF/20';
import React from 'react';
import readme from '../README.stories.mdx';

const iconMap = {
  ArrowRight20,
  ArrowDown20,
  Pdf20,
};

const iconOptions = {
  Default: null,
  'Arrow Right': 'ArrowRight20',
  'Arrow Down': 'ArrowDown20',
  PDF: 'Pdf20',
};

export default {
  title: 'Components|ButtonGroup',

  parameters: {
    ...readme.parameters,

    knobs: {
      ButtonGroup: ({ groupId }) => ({
        buttons: Array.from({
          length: number('Number of buttons', 2, {}, groupId),
        }).map((_, i) => ({
          href: text(`Link ${i + 1}`, `https://example.com`, groupId),
          copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
          renderIcon:
            iconMap[
              select(
                `Icon ${i + 1}`,
                iconOptions,
                iconOptions['Default'],
                groupId
              )
            ],
        })),
      }),
    },

    propsSet: {
      default: {
        ButtonGroup: {
          buttons: [
            {
              href: 'https://example.com',
              copy: 'Button 1',
            },
            {
              href: 'https://example.com',
              copy: 'Button 2',
            },
          ],
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { buttons } = parameters?.props?.ButtonGroup ?? {};
  return (
    <div
      className="bx-grid"
      style={{
        padding: 2 + `rem`,
      }}>
      <div>
        This button group is wrapped within the grid to let the buttons shrink
        when the text gets smaller
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-16 bx--col-md-6 bx--col-sm-16">
          <ButtonGroup buttons={buttons} />
        </div>
      </div>
      <div style={{ paddingTop: '20px' }}>
        This button group is not using the grid, so the buttons won't shrink
        according to the text size
      </div>
      <ButtonGroup buttons={buttons} />
    </div>
  );
};

/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select } from '@storybook/addon-knobs';
import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
import DDSContentBlockSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-block-simple/content-block-simple';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link';
import DDSCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import DDSCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
import { CONTENT_BLOCK_COPY_SIZE } from '../../content-block/content-block-copy';
import { CTA_STYLE, CTA_TYPE } from '../../cta/defs';
import readme from './README.stories.react.mdx';

const copy = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:

  Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
  Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  - [list item](https://www.ibm.com)
    - list "item 1a"
  1. list item 2
    1. list item 2a
        - list item 2a.a
`;

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const ctaStyles = {
  [`Card (${CTA_STYLE.CARD})`]: CTA_STYLE.CARD,
  [`Text (${CTA_STYLE.TEXT})`]: CTA_STYLE.TEXT,
};

export const Default = ({ parameters }) => {
  const { heading, ctaStyle, ctaType } = parameters?.props?.ContentBlockSimple ?? {};
  return (
    <>
      <DDSContentBlockSimple>
        <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
        <DDSContentBlockCopy size={CONTENT_BLOCK_COPY_SIZE.SMALL}>{copy}</DDSContentBlockCopy>
        {ctaStyle === 'card' ? (
          <DDSCardLink cta-type={ctaType} slot="footer" href="https://example.com">
            <DDSCardLinkHeading>Lorem ipsum dolor sit amet</DDSCardLinkHeading>
            <DDSCardFooter>
              <ArrowRight20 slot="icon" />
            </DDSCardFooter>
          </DDSCardLink>
        ) : (
          <DDSTextCTA cta-type={ctaType} slot="footer" href="#" icon-placement="right">
            Lorem ipsum dolor sit amet
          </DDSTextCTA>
        )}
      </DDSContentBlockSimple>
    </>
  );
};

Default.story = {
  parameters: {
    knobs: {
      ContentBlockSimple: () => ({
        heading: text('Heading (required)', 'Curabitur malesuada varius mi eu posuere'),
        copy,
        ctaStyle: select('CTA style', ctaStyles, CTA_STYLE.TEXT),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
      }),
    },
  },
};

export default {
  title: 'Components/Content block simple',
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--no-gutter bx--col-lg-12">{story()}</div>
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

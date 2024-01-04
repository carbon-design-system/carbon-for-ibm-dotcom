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
import { ArrowRight } from '@carbon/icons-react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
import C4DContentBlockSimple from '@carbon/ibmdotcom-web-components/es/components-react/content-block-simple/content-block-simple';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link';
import C4DCardLinkHeading from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link-heading';
import C4DCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/card/card-footer';
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

export const Default = (args) => {
  const { heading, ctaStyle, ctaType } = args?.ContentBlockSimple ?? {};
  return (
    <>
      <C4DContentBlockSimple>
        <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
        <C4DContentBlockCopy size={CONTENT_BLOCK_COPY_SIZE.SMALL}>
          {copy}
        </C4DContentBlockCopy>
        {ctaStyle === 'card' ? (
          <C4DCardLink
            cta-type={ctaType}
            slot="footer"
            href="https://example.com">
            <C4DCardLinkHeading>Lorem ipsum dolor sit amet</C4DCardLinkHeading>
            <C4DCardFooter>
              <ArrowRight size="20" slot="icon" />
            </C4DCardFooter>
          </C4DCardLink>
        ) : (
          <C4DTextCTA
            cta-type={ctaType}
            slot="footer"
            href="#"
            icon-placement="right">
            Lorem ipsum dolor sit amet
          </C4DTextCTA>
        )}
      </C4DContentBlockSimple>
    </>
  );
};

Default.story = {
  parameters: {
    knobs: {
      ContentBlockSimple: () => ({
        heading: text(
          'Heading (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
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
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--no-gutter cds--col-lg-12">{story()}</div>
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

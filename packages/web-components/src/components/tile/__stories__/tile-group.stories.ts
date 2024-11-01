/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import readme from './README--tile-group.stories.mdx';
import '@carbon/ibmdotcom-web-components/es/components/image';
import {
  Default as DefaultTile,
  WithImage as TileWithImage,
} from './tile.stories';
import { CTA_TYPE } from '@carbon/ibmdotcom-web-components/es/components/cta/defs';

const ctaTypeOptions = Object.values(CTA_TYPE).filter((value) => !!value);

export default {
  title: 'Components/Tile Group',
  parameters: {
    ...readme.parameters,
  },
  argTypes: {
    ctaType: {
      control: { type: 'select' },
      name: 'CTA type (optional)',
      options: ctaTypeOptions,
      defaultValue: ctaTypeOptions[0],
    },
    hasPictogram: {
      control: { type: 'boolean' },
      name: 'pictogram (optional)',
      defaultValue: false,
    },
    hasTagGroup: {
      control: { type: 'boolean' },
      name: 'tags (optional)',
      defaultValue: false,
    },
    ctaCopy: {
      control: { type: 'text' },
      name: 'cta text (optional)',
      defaultValue: 'Sign up for the trial',
    },
    alignWithContent: {
      control: { type: 'boolean' },
      name: 'align link with card content',
      defaultValue: false,
    },
    tocLayout: {
      control: { type: 'boolean' },
      name: 'TOC layout',
      defaultValue: false,
    },
    href: {
      control: { type: 'text' },
      name: 'href',
      defaultValue: 'https://example.com',
    },
  },
  decorators: [
    (story, { args: { tocLayout } }) => html`
      <c4d-video-cta-container class="cds--grid c4d-story-padding">
        ${tocLayout
          ? html`
              <div class="cds--row">
                <div
                  class="cds--col cds--col-sm-4 cds--col-md-4 cds--col-lg-4 cds--col-xlg-4 cds--col-max-4">
                  <p>Table of contents placeholder</p>
                </div>
                <div
                  class="cds--col cds--col-sm-4 cds--col-md-8 cds--col-lg-12 cds--col-xlg-12 cds--col-max-12">
                  ${story()}
                </div>
              </div>
            `
          : html`
              <div class="cds--row">
                <div class="cds--col">${story()}</div>
              </div>
            `}
      </c4d-video-cta-container>
    `,
  ],
};

export const Default = ({
  ctaType,
  hasTagGroup,
  ctaCopy,
  hasPictogram,
  alignWithContent,
  href,
}) => html`
  <c4d-tile-group>
    ${[...Array(8)].map(() =>
      DefaultTile({
        ctaType,
        hasTagGroup,
        ctaCopy,
        hasPictogram,
        alignWithContent,
        href,
      })
    )}
  </c4d-tile-group>
`;

export const WithImage = ({
  ctaType,
  hasTagGroup,
  ctaCopy,
  hasPictogram,
  alignWithContent,
  href,
}) => html`
  <c4d-tile-group>
    ${[...Array(8)].map(() =>
      TileWithImage({
        ctaType,
        hasTagGroup,
        ctaCopy,
        hasPictogram,
        alignWithContent,
        href,
      })
    )}
  </c4d-tile-group>
`;

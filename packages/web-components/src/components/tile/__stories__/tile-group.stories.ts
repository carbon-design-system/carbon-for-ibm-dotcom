/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../index';
import readme from './README--tile-group.stories.mdx';
import '../../image';
import {
  Default as DefaultTile,
  WithImage as TileWithImage,
} from './tile.stories';
import { CTA_TYPE } from '../../cta/defs';
import { boolean, number, select, text } from '@storybook/addon-knobs';

const ctaTypeOptions = Object.values(CTA_TYPE).filter((value) => !!value);

export default {
  title: 'Components/Tile Group',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      TileGroup: () => {
        const ctaType = select(
          'CTA type (cta-type)',
          ctaTypeOptions,
          ctaTypeOptions[0]
        );

        const ctaCopy = text('CTA text', 'Sign up for the trial');

        const href = text('CTA href', 'https://example.com');

        const hasPictogram = boolean('Add pictogram', false);

        const hasTagGroup = boolean('Add tag group', false);

        const alignWithContent = boolean(
          'Align link with card contents',
          false
        );

        const startSequenceNumber = number(
          'Starting sequence number for random label and heading',
          0
        );

        const tocLayout = boolean('Use 3/4 layout', false);

        return {
          ctaType,
          hasTagGroup,
          ctaCopy,
          hasPictogram,
          alignWithContent,
          href,
          startSequenceNumber,
          tocLayout,
        };
      },
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

export const Default = (args) => {
  const {
    ctaType,
    hasTagGroup,
    ctaCopy,
    hasPictogram,
    alignWithContent,
    href,
    startSequenceNumber,
  } = args?.TileGroup ?? {};
  return html`
    <c4d-tile-group>
      ${[...Array(8)].map(() =>
        DefaultTile({
          Tile: {
            ctaType,
            hasTagGroup,
            ctaCopy,
            hasPictogram,
            alignWithContent,
            href,
            startSequenceNumber,
          },
        })
      )}
    </c4d-tile-group>
  `;
};

export const WithImage = (args) => {
  const {
    ctaType,
    hasTagGroup,
    ctaCopy,
    hasPictogram,
    alignWithContent,
    href,
    startSequenceNumber,
  } = args?.TileGroup ?? {};
  return html`
    <c4d-tile-group>
      ${[...Array(8)].map(() =>
        TileWithImage({
          Tile: {
            ctaType,
            hasTagGroup,
            ctaCopy,
            hasPictogram,
            alignWithContent,
            href,
            startSequenceNumber,
          },
        })
      )}
    </c4d-tile-group>
  `;
};

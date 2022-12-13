/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import '../index';
import { CTA_TYPE } from '../../cta/defs';
import image from '../../../../../storybook-images/assets/card-section-offset/background-media.jpg';

const ctaTypes = [CTA_TYPE.LOCAL, CTA_TYPE.DOWNLOAD, CTA_TYPE.EXTERNAL, CTA_TYPE.VIDEO];

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
  [CTA_TYPE.DOWNLOAD]:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  [CTA_TYPE.VIDEO]: '1_9h94wo6b',
};

const defaultCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-eyebrow>Label</dds-card-eyebrow>
    <dds-card-heading
      >Lorem ipsum dolor sit amet, pro graeco tibique an</dds-card-heading
    >
    <p>
      Lorem ipsum dolor sit amet, habeo iisque eum ex. Vel postea singulis
      democritum ex. Illud ullum graecis
    </p>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

const cards = Array.from({
  length: 3,
}).map(() => defaultCardGroupItem);

export const Default = args => {
  const { heading, ctaType, ctaCopy, download, alt, defaultSrc } = args;

  const headingComponent = document.querySelector('dds-content-block-heading');
  if (headingComponent && heading) {
    (headingComponent as HTMLElement).shadowRoot!.innerHTML = heading;
  }

  const currentHref = hrefsForType[ctaType ?? CTA_TYPE.REGULAR];
  return html`
    <dds-card-section-offset>
      <dds-background-media
        gradient-direction="left-to-right"
        mobile-position="top"
        alt="${ifNonNull(alt)}"
        default-src="${ifNonNull(defaultSrc)}">
      </dds-background-media>
      <dds-content-block-heading slot="heading"
        >${heading}</dds-content-block-heading
      >
      <dds-text-cta
        slot="action"
        icon-placement="right"
        cta-type="${ifNonNull(ctaType)}"
        download="${ifNonNull(download)}"
        href="${currentHref}"
      >
        ${ctaCopy}
      </dds-text-cta>
      <dds-card-group slot="card-group" cards-per-row="2">
        <dds-card-group-item empty></dds-card-group-item>${cards}
      </dds-card-group>
    </dds-card-section-offset>
  `;
};

export default {
  title: 'Components/Card section offset',
  component: 'dds-card-section-offset',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <dds-video-cta-container> ${story()} </dds-video-cta-container>
        </div>
      </div>
    `,
  ],
  argTypes: {
    ctaType: {
      options: ctaTypes,
      control: { type: 'select' },
      defaultValue: CTA_TYPE.LOCAL,
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Aliquam condimentum interdum',
      if: { arg: 'ctaType', neq: CTA_TYPE.VIDEO },
    },
    ctaCopy: {
      control: { type: 'text' },
      defaultValue: 'Lorem ipsum dolor sit amet',
      if: { arg: 'ctaType', neq: CTA_TYPE.VIDEO },
    },
    downloadTarget: {
      control: { type: 'text' },
      defaultValue: 'IBM_Annual_Report_2019.pdf',
      if: { arg: 'ctaType', eq: CTA_TYPE.DOWNLOAD },
    },
    href: {
      control: { type: 'text' },
      defaultValue: CTA_TYPE.REGULAR,
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'Image alt text',
    },
    defaultSrc: {
      control: { type: 'text' },
      defaultValue: image,
    },
    complementaryStyleScheme: {
      table: {
        disable: true,
      },
    },
    'complementary-style-scheme': {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    'card-group': {
      table: {
        disable: true,
      },
    },
    action: {
      table: {
        disable: true,
      },
    },
    complementary: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
    media: {
      table: {
        disable: true,
      },
    },
    copy: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    propsSet: {
      default: {
        CardSectionOffset: {
          heading: 'Aliquam condimentum interdum',
          ctaCopy: 'Lorem ipsum dolor sit amet',
          ctaType: 'local',
          download: undefined,
          href: 'https://www.example.com',
          cards: [
            defaultCardGroupItem,
            defaultCardGroupItem,
            defaultCardGroupItem,
          ],
          alt: 'Image alt text',
          defaultSrc: image,
        },
      },
    },
  },
};

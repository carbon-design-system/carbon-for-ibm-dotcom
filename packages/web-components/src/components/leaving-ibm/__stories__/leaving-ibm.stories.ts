/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, text } from '@storybook/addon-knobs';
import styles from './leaving-ibm.stories.scss';
import '../leaving-ibm-container';

import readme from './README.stories.mdx';

const demoKnobs = groupId => ({
  linkText: text('Link text', 'Learn more about Carbon', groupId),
  href: text('href (href)', 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/', groupId),
});

const demoPropsSet = {
  default: {
    'leaving-ibm': {
      open: true,
      href: 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/',
    },
  },
};

export const WithHTMLLink = ({ parameters }) => {
  const { linkText, href } = parameters?.props?.['leaving-ibm'];
  return html`
    <dds-leaving-ibm-container></dds-leaving-ibm-container>
    <a href="${href}" data-leaving-ibm>
      ${linkText}
    </a>
  `;
};
WithHTMLLink.story = {
  title: 'Components/Leaving IBM/With HTML Link',
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => demoKnobs(groupId),
    },
    propsSet: demoPropsSet,
  },
};

export const WithCarbonLink = ({ parameters }) => {
  const { linkText, href } = parameters?.props?.['leaving-ibm'];
  return html`
    <dds-leaving-ibm-container></dds-leaving-ibm-container>
    <bx-link href="${href}" data-leaving-ibm>
      ${linkText}
    </bx-link></li>
  `;
};

WithCarbonLink.story = {
  title: 'Components/Leaving IBM/With Carbon Link',
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => demoKnobs(groupId),
    },
    propsSet: demoPropsSet,
  },
};

export const WithLinkList = ({ parameters }) => {
  const { linkText, href } = parameters?.props?.['leaving-ibm'];
  return html`
    <dds-leaving-ibm-container></dds-leaving-ibm-container>
    <dds-link-list type="default">
      <dds-link-list-heading>Carbon Design System</dds-link-list-heading>
      <dds-link-list-item-card-cta href="${href}" cta-type="external" data-leaving-ibm>
        <p>${linkText}</p>
        <dds-card-cta-footer></dds-card-cta-footer>
      </dds-link-list-item-card-cta>
    </dds-link-list>
  `;
};
WithLinkList.story = {
  title: 'Components/Leaving IBM/With Link List',
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => demoKnobs(groupId),
    },
    propsSet: demoPropsSet,
  },
};

export const WithCTABlockItem = ({ parameters }) => {
  const { linkText, href } = parameters?.props?.['leaving-ibm'];
  return html`
    <dds-leaving-ibm-container></dds-leaving-ibm-container>
    <dds-cta-block-item-row>
      <dds-cta-block-item>
        <dds-content-item-heading>Lorem ipsum dolor sit amet</dds-content-item-heading>
        <dds-content-item-copy
          >Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</dds-content-item-copy
        >
        <dds-text-cta slot="footer" cta-type="external" icon-placement="right" href=${href} data-leaving-ibm>
          ${linkText}
        </dds-text-cta>
      </dds-cta-block-item>
    </dds-cta-block-item-row>
  `;
};
WithCTABlockItem.story = {
  title: 'Components/Leaving IBM/With CTA Block Item',
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => demoKnobs(groupId),
    },
    propsSet: demoPropsSet,
  },
};

export const Default = ({ parameters }) => {
  const { open, href } = parameters?.props?.['leaving-ibm'] ?? {};
  return html`
    <dds-leaving-ibm-container ?open=${open} href="${href}"> </dds-leaving-ibm-container>
  `;
};

export default {
  title: 'Components/Leaving IBM',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      'leaving-ibm': ({ groupId }) => ({
        open: boolean('open (open)', true, groupId),
        href: text('href (href)', 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/', groupId),
      }),
    },
    propsSet: {
      default: {
        'leaving-ibm': {
          open: true,
          href: 'https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/',
        },
      },
    },
  },
};

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import { prefix } from '../../globals/settings';
import Download16 from '@carbon/web-components/es/icons/download/16';
import textNullable from '../../../.storybook/knob-text-nullable';
import { LINK_SIZE } from './link';
import storyDocs from './link-story.mdx';

const sizes = {
  [`Small size (${LINK_SIZE.SMALL})`]: LINK_SIZE.SMALL,
  [`Medium size (${LINK_SIZE.MEDIUM})`]: LINK_SIZE.MEDIUM,
  [`Large size (${LINK_SIZE.LARGE})`]: LINK_SIZE.LARGE,
};

export const Default = () => {
  return html` <cds-link href="#"> Link </cds-link> `;
};

Default.storyName = 'Default';

export const Inline = () => {
  return html`
    <cds-link inline href="#"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</cds-link
    >
    <p>
      Ut facilisis semper lorem in aliquet. Aliquam accumsan ante justo, vitae
      fringilla eros vehicula id. Ut at enim quis libero pharetra ullamcorper.
      Maecenas feugiat sodales arcu ut porttitor. In blandit ultricies est.
      Vivamus risus massa, cursus eu tellus sed, sagittis commodo nunc.
      <cds-link inline href="#"
        >Maecenas nunc mauris, consequat quis mauris sit amet,</cds-link
      >
      finibus suscipit nunc. Phasellus ex quam, placerat quis tempus sit amet,
      pretium nec sem. Etiam dictum scelerisque mauris, blandit ultrices erat
      pellentesque id. Quisque venenatis purus sit amet sodales condimentum.
      Duis at tincidunt orci. Ut velit ipsum, lacinia at ex quis, aliquet
      rhoncus purus. Praesent et scelerisque ligula.
    </p>
  `;
};

export const pairedWithIcon = (args) => {
  const {
    disabled,
    download,
    href,
    hreflang,
    linkRole,
    ping,
    rel,
    size,
    target,
    type,
    onClick,
  } = args?.[`${prefix}-link`] ?? {};
  return html`
    <cds-link
      ?disabled="${disabled}"
      download="${ifDefined(download)}"
      href="${ifDefined(href)}"
      hreflang="${ifDefined(hreflang)}"
      link-role="${ifDefined(linkRole)}"
      ping="${ifDefined(ping)}"
      rel="${ifDefined(rel)}"
      size="${ifDefined(size)}"
      target="${ifDefined(target)}"
      type="${ifDefined(type)}"
      @click="${onClick}">
      Download ${Download16({ slot: 'icon' })}
    </cds-link>
  `;
};

export const Playground = (args) => {
  const { disabled, inline, visited, href, size } =
    args?.[`${prefix}-link`] ?? {};
  return html`
    <cds-link
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      ?inline="${inline}"
      ?visited="${visited}">
      Link
    </cds-link>
  `;
};

Playground.story = {
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-link`]: () => ({
        disabled: boolean('Disabled (disabled)', false),
        href: textNullable('Link href (href)', 'https://example.com/'),
        inline: boolean('Inline (inline)', false),
        size: select('Link size (size)', sizes, LINK_SIZE.MEDIUM),
        visited: boolean('Visited (visited)', false),
        onClick: action('click'),
      }),
    },
  },
};

export default {
  title: 'Components/Link',
  parameters: {
    ...storyDocs.parameters,
  },
};

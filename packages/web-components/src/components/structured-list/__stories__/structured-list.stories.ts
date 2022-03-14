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
import '../index';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return html`
    <dds-structured-list>
      <dds-structured-list-row slot="header">
        <dds-structured-list-cell>Column 1</dds-structured-list-cell>
        <dds-structured-list-cell>Column 2</dds-structured-list-cell>
      </dds-structured-list-row>
      <dds-structured-list-row>
        <dds-structured-list-cell>Row Item</dds-structured-list-cell>
        <dds-structured-list-cell>Lorem Ipsum</dds-structured-list-cell>
      </dds-structured-list-row>
      <dds-structured-list-row>
        <dds-structured-list-cell>Row Item</dds-structured-list-cell>
        <dds-structured-list-cell>Lorem Ipsum</dds-structured-list-cell>
      </dds-structured-list-row>
      <dds-structured-list-row>
        <dds-structured-list-cell>Row Item</dds-structured-list-cell>
        <dds-structured-list-cell>Lorem Ipsum</dds-structured-list-cell>
      </dds-structured-list-row>
    </dds-structured-list>
  `;
};

export const WithRowHeaders = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return html`
    <dds-structured-list>
      <dds-structured-list-row slot="header">
      <dds-structured-list-cell></dds-structured-list-cell>
      <dds-structured-list-cell>Product 1</dds-structured-list-cell>
      <dds-structured-list-cell>Product 2</dds-structured-list-cell>
      <dds-structured-list-cell>Product 3</dds-structured-list-cell>
      </dds-structured-list-row>
      <dds-structured-list-row>
        <dds-structured-list-cell labels="row">Feature 1</dds-structured-list-cell>
        <dds-structured-list-cell>Lorem ipsum</dds-structured-list-cell>
        <dds-structured-list-cell>Dolor sit amet</dds-structured-list-cell>
        <dds-structured-list-cell>Consectetur adipisicing elit</dds-structured-list-cell>
      </dds-structured-list-row>
      <dds-structured-list-row>
        <dds-structured-list-cell labels="row">Feature 2</dds-structured-list-cell>
        <dds-structured-list-cell>Lorem ipsum</dds-structured-list-cell>
        <dds-structured-list-cell>Dolor sit amet</dds-structured-list-cell>
        <dds-structured-list-cell>Consectetur adipisicing elit</dds-structured-list-cell>
      </dds-structured-list-row>
      <dds-structured-list-row>
        <dds-structured-list-cell labels="row">Feature 3</dds-structured-list-cell>
        <dds-structured-list-cell>Lorem ipsum</dds-structured-list-cell>
        <dds-structured-list-cell>Dolor sit amet</dds-structured-list-cell>
        <dds-structured-list-cell>Consectetur adipisicing elit</dds-structured-list-cell>
      </dds-structured-list-row>
    </dds-structured-list>
  `;
};

export const WithSubheaders = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return html`
    <dds-structured-list>
      <dds-structured-list-row slot="header">
        <dds-structured-list-cell></dds-structured-list-cell>
        <dds-structured-list-cell>Product 1</dds-structured-list-cell>
        <dds-structured-list-cell>Product 2</dds-structured-list-cell>
        <dds-structured-list-cell>Product 3</dds-structured-list-cell>
      </dds-structured-list-row>
      <dds-structured-list-group title="Group 1">
        <dds-structured-list-row>
          <dds-structured-list-cell labels="row">Feature 1</dds-structured-list-cell>
          <dds-structured-list-cell>Lorem ipsum</dds-structured-list-cell>
          <dds-structured-list-cell>Dolor sit amet</dds-structured-list-cell>
          <dds-structured-list-cell>Consectetur adipisicing elit</dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell labels="row">Feature 2</dds-structured-list-cell>
          <dds-structured-list-cell>Lorem ipsum</dds-structured-list-cell>
          <dds-structured-list-cell>Dolor sit amet</dds-structured-list-cell>
          <dds-structured-list-cell>Consectetur adipisicing elit</dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell labels="row">Feature 3</dds-structured-list-cell>
          <dds-structured-list-cell>Lorem ipsum</dds-structured-list-cell>
          <dds-structured-list-cell>Dolor sit amet</dds-structured-list-cell>
          <dds-structured-list-cell>Consectetur adipisicing elit</dds-structured-list-cell>
        </dds-structured-list-row>
      </dds-structured-list-group>
    </dds-structured-list>
  `;
};

export default {
  title: 'Components/Structured List',
  parameters: {
    ...readme.parameters,
    knobs: {
      StructuredList: () => ({
        copy: textNullable('Copy', 'Hello world!'),
      }),
    },
  },
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
};

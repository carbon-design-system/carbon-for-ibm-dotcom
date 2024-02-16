/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { boolean, select, text } from '@storybook/addon-knobs';
import '../button/button';
import {
  TEARSHEET_INFLUENCER_PLACEMENT,
  TEARSHEET_INFLUENCER_WIDTH,
  TEARSHEET_WIDTH,
} from './tearsheet';
import './index';
import '../text-input/index';
import '../textarea/index';
import storyDocs from './tearsheet-story.mdx';
import { prefix } from '../../globals/settings';

import styles from './story-styles.scss';
import { BUTTON_KIND } from '../button/button';
const toggleButton = () => {
  document.querySelector(`${prefix}-tearsheet`)?.toggleAttribute('open');
};

const widths = {
  // 'default (narrow)': null,
  [`Narrow (${TEARSHEET_WIDTH.NARROW})`]: TEARSHEET_WIDTH.NARROW,
  [`Wide (${TEARSHEET_WIDTH.WIDE})`]: TEARSHEET_WIDTH.WIDE,
};

const influencerWidths = {
  // 'default (narrow)': null,
  [`Narrow (${TEARSHEET_INFLUENCER_WIDTH.NARROW})`]:
    TEARSHEET_INFLUENCER_WIDTH.NARROW,
  [`Wide (${TEARSHEET_INFLUENCER_WIDTH.WIDE})`]:
    TEARSHEET_INFLUENCER_WIDTH.WIDE,
};

const placements = {
  // 'default (right)': null,
  [`Left (${TEARSHEET_INFLUENCER_PLACEMENT.LEFT})`]:
    TEARSHEET_INFLUENCER_PLACEMENT.LEFT,
  [`right (${TEARSHEET_INFLUENCER_PLACEMENT.RIGHT})`]:
    TEARSHEET_INFLUENCER_PLACEMENT.RIGHT,
};

const contents = {
  Empty: 0,
  'Brief content': 1,
  'Longer content': 2,
};

const storyPrefix = 'tearsheet-stories';

const getContent = (index) => {
  switch (index) {
    case 1:
      return html`
        <style>
          ${styles}
        </style>
        <div class=${`${storyPrefix}__dummy-content-block`}>
          <h5>Section</h5>
          <cds-text-input
            label="Input A"
            id="tearsheet-story-text-input-a"
            class="${storyPrefix}text-input"></cds-text-input>
          <cds-text-input
            label="Input B"
            id="tearsheet-story-text-input-b"
            class="${storyPrefix}text-input"></cds-text-input>
        </div>
      `;
    case 2:
      return html` <style>
          ${styles}
        </style>
        <div class=${`${storyPrefix}__dummy-content-block`}>
          <h5>Section</h5>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Input A"
              id="tearsheet-story-text-input-a"></cds-text-input>
            <cds-text-input
              label="Input B"
              id="tearsheet-story-text-input-b"></cds-text-input>
          </div>
          <div class="${storyPrefix}text-inputs">
            <cds-text-input
              label="Input C"
              id="tearsheet-story-text-input-c"></cds-text-input>
            <cds-text-input
              label="Input D"
              id="tearsheet-story-text-input-d"></cds-text-input>
          </div>
          <div class="${storyPrefix}textarea-container">
            <cds-textarea
              label="Notes"
              value="This is a text area"></cds-textarea>
            <cds-textarea
              label="Notes"
              value="This is a text area"></cds-textarea>
            <cds-textarea
              label="Notes"
              value="This is a text area"></cds-textarea>
          </div>
        </div>`;
    default:
      return null;
  }
};

const labels = {
  'No label': 0,
  'Shorter label': 1,
  'Longer label': 2,
};

const getLabel = (index) => {
  switch (index) {
    case 1:
      return html`<span slot="label">A short label</span>`;
    case 2:
      return html`<span slot="label"
        >A longer label that might go on for a little bit</span
      >`;
    default:
      return null;
  }
};

const headerActions = {
  'No header actions': 0,
  'Drop down': 1,
  Buttons: 2,
};

const getActionToolbarItems = (index) => {
  switch (index) {
    case 1:
      return html`<cds-dropdown slot="header-actions">
        ${['option 1', 'option 2', 'option 3', 'option 4'].map(
          (option) => html` <cds-dropdown-item value="${option}"
            >${option}</cds-dropdown-item
          >`
        )}
      </cds-dropdown>`;
    case 2:
      return html`
        <cds-button
          slot="header-actions"
          kind=${BUTTON_KIND.SECONDARY}
          size="sm"
          style="width: initial">
          Secondary
        </cds-button>
        <cds-button
          slot="header-actions"
          kind=${BUTTON_KIND.PRIMARY}
          size="sm"
          style="width: initial">
          Primary
        </cds-button>
      `;
    default:
      return null;
  }
};

const actionItems = {
  'No actions': 0,
  'One button': 1,
  'Two buttons with ghost': 2,
  'Two buttons with danger': 3,
  'Three buttons with ghost': 4,
  'Three buttons with danger': 5,
};

// TODO: There are problems switching this
const getActionItems = (index) => {
  switch (index) {
    case 1:
      return html`<cds-button key="p" slot="actions" kind=${BUTTON_KIND.PRIMARY}
        >Primary</cds-button
      >`;
    case 2:
      return html`
        <cds-button slot="actions" kind=${BUTTON_KIND.GHOST}>Ghost</cds-button>
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >
      `;
    case 3:
      return html` <cds-button slot="actions" kind=${BUTTON_KIND.DANGER}
          >Danger</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >`;
    case 4:
      return html` <cds-button slot="actions" kind=${BUTTON_KIND.GHOST}
          >Ghost</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.SECONDARY}
          >Secondary</cds-button
        >
        <cds-button slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >`;
    case 5:
      return html`<cds-button
          key="danger"
          slot="actions"
          kind=${BUTTON_KIND.DANGER}
          >Danger</cds-button
        >
        <cds-button key="secondary" slot="actions" kind=${BUTTON_KIND.SECONDARY}
          >Secondary</cds-button
        >
        <cds-button key="primary" slot="actions" kind=${BUTTON_KIND.PRIMARY}
          >Primary</cds-button
        >`;
    default:
      return null;
  }
};

const slugs = {
  'No Slug': 0,
  'With Slug': 1,
};

const getSlug = (index) => {
  switch (index) {
    case 1:
      return html`<cds-slug slot="slug" className="slug-container" size="xs">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h1>84%</h1>
          <p class="secondary bold">Confidence score</p>
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-slug>`;
    default:
      return null;
  }
};

export default {
  title: 'Experimental/Tearsheet',
  decorators: [(story) => html` ${story()} `],
  parameters: {
    ...storyDocs.parameters,
  },
};

const DefaultTemplate = (argsIn) => {
  const args = {
    actionItems: getActionItems(select('Slot (actions)', actionItems, 1)),
    headerActions: getActionToolbarItems(
      select('Slot (header-toolbar)', headerActions, 0)
    ),
    content: getContent(select('Slot (default), panel contents', contents, 2)),
    label: getLabel(select('label', labels, 2)),
    open: boolean('open', false),
    influencerPlacement: select(
      'placement',
      placements,
      TEARSHEET_INFLUENCER_PLACEMENT.RIGHT
    ),
    preventCloseOnClickOutside: boolean(
      'prevent-close-on-click-outside',
      false
    ),
    selectorInitialFocus: text('selector-initial-focus', ''),
    width: select('width', widths, TEARSHEET_WIDTH.NARROW),
    slug: getSlug(select('slug (AI slug)', slugs, 0)),
    description: text('description', 'Description of the tearsheet use case.'),
    title: text(
      'title',
      'This title is testing a very long title to see how this behaves with a longer title. It needs to be long enough to trigger overflow when collapsed.'
    ),

    ...(argsIn?.['cds-tearsheet'] ?? {}),
  };

  return html`
    <div class="${storyPrefix}story-container">
      <div class="${storyPrefix}story-header"></div>
      <div id="page-content-selector" class="${storyPrefix}story-content">
        <cds-button @click="${toggleButton}">Toggle tearsheet</cds-button>
      </div>
    </div>
    <cds-tearsheet
      class=${args.class}
      selector-initial-focus=${args.selectorInitialFocus}
      ?open=${args.open}
      influencer-placement=${args.influencerPlacement}
      influencer-width:=${args.influencerWidth}
      ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
      width=${args.width}>
      <!-- default slotted content -->
      ${args.content}

      <!-- slotted header label -->
      ${args.label}

      <!-- slotted header title -->
      ${args.title ? html`<span slot="title">${args.title}</span>` : ''}

      <!-- slotted header description -->
      ${args.description
        ? html`<span slot="description">${args.description}</span>`
        : ''}

      <!-- slotted action in header cds-buttons -->
      ${args.headerActions}

      <!-- slotted action items cds-buttons -->
      ${args.actionItems}

      <!-- slotted slug -->
      ${args.slug}
    </cds-tearsheet>
  `;
};

type TemplateType = {
  (args: any): TemplateResult<1>;
  parameters: { knobs: { [key: string]: any } };
};

export const Default = DefaultTemplate.bind({}) as TemplateType;
Default.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-tearsheet': () => ({}),
  },
};

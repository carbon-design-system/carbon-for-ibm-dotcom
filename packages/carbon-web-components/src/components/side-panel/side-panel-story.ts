/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select, text } from '@storybook/addon-knobs';
import '../button/button';
import CDSSidePanel, { SIDE_PANEL_SIZE } from './side-panel';
import './index';
import '../text-input/index';
import '../textarea/index';
import storyDocs from './side-panel-story.mdx';
import { SIDE_PANEL_PLACEMENT } from './defs';
import Settings from '@carbon/icons/lib/settings/16';
import Trashcan from '@carbon/icons/lib/trash-can/16';

import styles from './story-styles.scss';
import { BUTTON_KIND } from '../button/button';
const toggleButton = () => {
  document.querySelector('cds-side-panel')?.toggleAttribute('open');
};

const sizes = {
  // 'default (md)': null,
  [`Extra small size (${SIDE_PANEL_SIZE.EXTRA_SMALL})`]:
    SIDE_PANEL_SIZE.EXTRA_SMALL,
  [`Small size (${SIDE_PANEL_SIZE.SMALL})`]: SIDE_PANEL_SIZE.SMALL,
  [`Medium size (default) (${SIDE_PANEL_SIZE.MEDIUM})`]: SIDE_PANEL_SIZE.MEDIUM,
  [`Large size (${SIDE_PANEL_SIZE.LARGE})`]: SIDE_PANEL_SIZE.LARGE,
  [`Extra Extra Large size (${SIDE_PANEL_SIZE.EXTRA_EXTRA_LARGE})`]:
    SIDE_PANEL_SIZE.EXTRA_EXTRA_LARGE,
};

const placements = {
  // 'default (right)': null,
  left: SIDE_PANEL_PLACEMENT.LEFT,
  'right (default)': SIDE_PANEL_PLACEMENT.RIGHT,
};

const buttons = {
  'One (1)': 1,
  'Two (2)': 2,
  'Three (3)': 3,
};

const contents = {
  Empty: 0,
  'Brief content': 1,
  'Longer content': 2,
};

const storyPrefix = 'side-panel-stories__';

const getContent = (index) => {
  switch (index) {
    case 1:
      return html`
        <style>
          ${styles}
        </style>
        <h5>Section</h5>
        <cds-text-input
          label="Input A"
          id="side-panel-story-text-input-a"
          class="${storyPrefix}text-input"></cds-text-input>
        <cds-text-input
          label="Input B"
          id="side-panel-story-text-input-b"
          class="${storyPrefix}text-input"></cds-text-input>
      `;
    case 2:
      return html` <style>
          ${styles}
        </style>
        <h5>Section</h5>
        <div class="${storyPrefix}text-inputs">
          <cds-text-input
            label="Input A"
            id="side-panel-story-text-input-a"></cds-text-input>
          <cds-text-input
            label="Input B"
            id="side-panel-story-text-input-b"></cds-text-input>
        </div>
        <div class="${storyPrefix}text-inputs">
          <cds-text-input
            label="Input C"
            id="side-panel-story-text-input-c"></cds-text-input>
          <cds-text-input
            label="Input D"
            id="side-panel-story-text-input-d"></cds-text-input>
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
      return 'A short label';
    case 2:
      return 'A longer label that might go on for a little bit';
    default:
      return '';
  }
};

const subtitles = {
  'No subtitle': 0,
  'Short subtitle': 1,
  'Longer subtitle': 2,
};
const getSubTitle = (index) => {
  switch (index) {
    case 1:
      return html`<div slot="subtitle">This is your subtitle slot.</div>`;
    case 2:
      return html`<div slot="subtitle">
        I am your subtitle slot for <strong>adding detail</strong> that can be
        one or two lines.
      </div>`;
    default:
      return null;
  }
};

const actionToolbarItems = {
  'No action toolbar': 0,
  'With action toolbar': 1,
};

const getActionToolbarItems = (index) => {
  switch (index) {
    case 1:
      return html`
        <cds-button slot="action-toolbar">Copy</cds-button>
        <cds-button
          slot="action-toolbar"
          aria-label="Settings"
          has-icon-only="true"
          kind=${BUTTON_KIND.GHOST}
          size="sm"
          tooltip-text="Settings">
          ${Settings({ slot: 'icon' })}
        </cds-button>
        <cds-button
          slot="action-toolbar"
          aria-label="Delete"
          has-icon-only="true"
          kind=${BUTTON_KIND.GHOST}
          size="sm"
          tooltip-text="Delete">
          ${Trashcan({ slot: 'icon' })}
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

export default {
  title: 'Components/SidePanel',
  decorators: [(story) => html` ${story()} `],
  parameters: {
    ...storyDocs.parameters,
  },
};

const DefaultTemplate = (argsIn) => {
  const args = {
    actionItems: getActionItems(select('Slot (actions)', actionItems, 1)),
    actionToolbarItems: getActionToolbarItems(
      select('Slot (action-toolbar)', actionToolbarItems, 0)
    ),
    animateTitle: boolean('animate-title (Title animates on scroll)', true),
    class: text('class', 'a-user-class'),
    condenseActions: boolean('condense-actions', false),
    content: getContent(select('Slot (default), panel contents', contents, 2)),
    includeOverlay: boolean('include-overlay', true),
    label: getLabel(select('label', labels, 2)),
    open: boolean('open', false),
    placement: select('placement', placements, SIDE_PANEL_PLACEMENT.RIGHT),
    preventCloseOnClickOutside: boolean(
      'prevent-close-on-click-outside',
      false
    ),
    selectorPageContent: text(
      'selector-page-content',
      '#page-content-selector'
    ),
    selectorInitialFocus: text('selector-initial-focus', ''),
    size: select('size', sizes, SIDE_PANEL_SIZE.MEDIUM),
    slideIn: boolean('slide-in', false),
    subtitle: getSubTitle(select('Slot (subtitle)', subtitles, 1)),
    title: text(
      'title',
      'This title is testing a very long title to see how this behaves with a longer title. It needs to be long enough to trigger overflow when collapsed.'
    ),

    ...(argsIn?.['cds-side-panel'] ?? {}),
  };

  return html`
    <div class="${storyPrefix}story-container">
      <div class="${storyPrefix}story-header"></div>
      <div id="page-content-selector" class="${storyPrefix}story-content">
        <cds-button @click="${toggleButton}">Toggle side-panel</cds-button>
      </div>
    </div>
    <cds-side-panel
      ?animate-title=${args.animateTitle}
      class=${args.class}
      ?condense-actions=${args.condensedActions}
      current-step="0"
      ?include-overlay=${args.includeOverlay}
      selector-initial-focus=${args.selectorInitialFocus}
      label-text="${args.label}"
      ?open=${args.open}
      placement=${args.placement}
      ?prevent-close-on-click-outside=${args.preventCloseOnClickOutside}
      selector-page-content=${args.selectorPageContent}
      size=${args.size}
      ?slide-in=${args.slideIn}
      title=${args.title}>
      <!-- default slotted content -->
      ${args.content}

      <!-- slotted subtitle slotted content -->
      ${args.subtitle}

      <!-- slotted action toolbar cds-buttons -->
      ${args.actionToolbarItems}

      <!-- slotted action items cds-buttons -->
      ${args.actionItems}
    </cds-side-panel>
  `;
};

export const SlideOver = DefaultTemplate.bind({});
SlideOver.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-side-panel': () => ({}),
  },
};

export const SlideIn = DefaultTemplate.bind({});
SlideIn.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-side-panel': () => ({
      slideIn: boolean('slide-in', true),
    }),
  },
};

export const WithActionToolbar = DefaultTemplate.bind({});
WithActionToolbar.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-side-panel': () => ({
      actionToolbarItems: getActionToolbarItems(
        select('Action toolbar slot', actionToolbarItems, 1)
      ),
    }),
  },
};

export const SpecifyElementToHaveFocus = DefaultTemplate.bind({});
SpecifyElementToHaveFocus.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-side-panel': () => ({
      focusSelector: text(
        'selector-primary-focus',
        '#side-panel-story-text-input-a'
      ),
      label: getLabel(select('label', labels, 0)),
    }),
  },
};

export const WithStaticTitle = DefaultTemplate.bind({});
WithStaticTitle.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-side-panel': () => ({
      animateTitle: boolean('animate-title (Title animates on scroll)', false),
      label: getLabel(select('label', labels, 0)),
    }),
  },
};

export const WithStaticTitleAndActionToolbar = DefaultTemplate.bind({});
WithStaticTitleAndActionToolbar.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-side-panel': () => ({
      actionToolbarItems: getActionToolbarItems(
        select('Action toolbar slot', actionToolbarItems, 1)
      ),
      animateTitle: boolean('animate-title (Title animates on scroll)', false),
      label: getLabel(select('label', labels, 0)),
    }),
  },
};

export const WithoutTitle = DefaultTemplate.bind({});
WithoutTitle.parameters = {
  ...storyDocs.parameters,
  knobs: {
    'cds-side-panel': () => ({
      label: getLabel(select('label', labels, 0)),
      title: text('title', ''),
    }),
  },
};

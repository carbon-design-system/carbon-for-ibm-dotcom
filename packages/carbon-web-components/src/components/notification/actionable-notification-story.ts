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
import textNullable from '../../../.storybook/knob-text-nullable';
import { NOTIFICATION_KIND } from './inline-notification';
import './actionable-notification';
import './actionable-notification-button';
import storyDocs from './notification-story.mdx';
import { prefix } from '../../globals/settings';
import kinds from './stories/helper';
import '../button/button';

const noop = () => {};

export const Default = () => {
  return html`
    <cds-actionable-notification
      kind="${NOTIFICATION_KIND.ERROR}"
      title="Notification title"
      subtitle="Subtitle text goes here">
    </cds-actionable-notification>
  `;
};

export const Playground = (args) => {
  const {
    actionButtonLabel,
    kind,
    title,
    subtitle,
    hideCloseButton,
    lowContrast,
    role,
    inline,
    statusIconDescription,
    disableClose,
    onBeforeClose = noop,
    onClose = noop,
  } = args?.[`${prefix}-actionable-notification`] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <cds-actionable-notification
      kind="${ifDefined(kind)}"
      title="${ifDefined(title)}"
      subtitle="${ifDefined(subtitle)}"
      role="${ifDefined(role)}"
      ?inline="${inline}"
      ?hide-close-button="${hideCloseButton}"
      ?low-contrast="${lowContrast}"
      status-icon-description="${ifDefined(statusIconDescription)}"
      @cds-notification-beingclosed="${handleBeforeClose}"
      @cds-notification-closed="${onClose}">
      <cds-actionable-notification-button slot="action"
        >${actionButtonLabel}</cds-actionable-notification-button
      >
    </cds-actionable-notification>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-actionable-notification`]: () => ({
      actionButtonLabel: textNullable(
        'Action button label (action-button-label)',
        'Action'
      ),
      kind: select(
        'The notification kind (kind)',
        kinds,
        NOTIFICATION_KIND.ERROR
      ),
      title: textNullable('Title (title)', 'Notification title'),
      subtitle: textNullable('Subtitle (subtitle)', 'Subtitle text goes here.'),
      hideCloseButton: boolean(
        'Hide the close button (hide-close-button)',
        false
      ),
      lowContrast: boolean('Use low contrast variant (low-contrast)', false),
      inline: boolean('Inline (inline)', false),
      role: textNullable('Role (role)', 'alertdialog'),
      statusIconDescription: textNullable(
        'statusIconDescription (status-icon-description)',
        'notification'
      ),
      onBeforeClose: action(`${prefix}-notification-beingclosed`),
      onClose: action(`${prefix}-notification-closed`),
    }),
  },
};

export default {
  title: 'Components/Notifications/Actionable',
  parameters: {
    ...storyDocs.parameters,
  },
};

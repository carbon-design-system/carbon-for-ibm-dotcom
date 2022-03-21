import BXStructuredListRow from 'carbon-web-components/es/components/structured-list/structured-list-row';
import { customElement } from 'lit-element';
import { html } from 'lit-html';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list-row`)
class DDSStructuredListRow extends BXStructuredListRow {
  connectedCallback() {
    super.connectedCallback();
  }

  /* eslint-disable */
  // @ts-ignore required to unset inherited functionality
  updated(changedProperties) {}
  /* eslint-enable */

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default DDSStructuredListRow;

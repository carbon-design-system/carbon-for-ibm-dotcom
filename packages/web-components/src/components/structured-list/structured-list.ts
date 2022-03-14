import BXStructuredList from 'carbon-web-components/es/components/structured-list/structured-list';
import { customElement } from 'lit-element';
import { html, TemplateResult } from 'lit-html';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list`)
class DDSStructuredList extends BXStructuredList {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <dds-structured-list-body>
        <slot></slot>
      </dds-structured-list-body>
    `;
  }

  static styles = styles;
}

export default DDSStructuredList;

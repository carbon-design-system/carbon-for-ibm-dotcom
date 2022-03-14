import BXStructuredListHeaderRow from 'carbon-web-components/es/components/structured-list/structured-list-header-row';
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list-header-row`)
class DDSStructuredListHeaderRow extends BXStructuredListHeaderRow {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

export default DDSStructuredListHeaderRow;

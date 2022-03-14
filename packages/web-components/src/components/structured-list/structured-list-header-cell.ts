import BXStructuredListHeaderCell from 'carbon-web-components/es/components/structured-list/structured-list-header-cell';
import { customElement } from 'lit-element';
import { extend } from 'lodash-es';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list-header-cell`)
class DDSStructuredListHeaderCell extends BXStructuredListHeaderCell {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

export default DDSStructuredListHeaderCell;

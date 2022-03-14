import BXStructuredListBody from 'carbon-web-components/es/components/structured-list/structured-list-body';
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list-body`)
class DDSStructuredListBody extends BXStructuredListBody {
  connectedCallback() {
    super.connectedCallback();
  }

  static styles = styles;
}

export default DDSStructuredListBody;

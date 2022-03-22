import BXStructuredListCell from 'carbon-web-components/es/components/structured-list/structured-list-cell';
import { customElement, property } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSStructuredListGroup from './structured-list-group';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list-cell`)
class DDSStructuredListCell extends BXStructuredListCell {
  _parentGroup: DDSStructuredListGroup | null = this.closest(`${ddsPrefix}-structured-list-group`);

  @property({ attribute: 'aria-label', reflect: true })
  _groupLabel: string | null = null;

  connectedCallback() {
    super.connectedCallback();

    this._groupLabel = this._parentGroup?.groupTitle || null;
  }

  static styles = styles;
}

export default DDSStructuredListCell;

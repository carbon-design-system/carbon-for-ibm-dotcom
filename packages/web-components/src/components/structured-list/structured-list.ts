import BXStructuredList from 'carbon-web-components/es/components/structured-list/structured-list';
import { customElement } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './structured-list.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-structured-list`)
class DDSStructuredList extends BXStructuredList {
  _mutationObserver = new MutationObserver(this._setColumnSpans.bind(this));

  _setColumnSpans(entries) {
    entries.forEach(entry => {
      const attr = entry.attributeName;

      if (attr.startsWith('col-span')) {
        if (this.hasAttribute(attr) && parseInt(this.getAttribute(attr)!, 10)) {
          this.style.setProperty(`--${attr}`, parseInt(this.getAttribute(attr)!, 10).toString());
        } else {
          this.style.removeProperty(`--${attr}`);
        }
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._mutationObserver.observe(this, { attributes: true, attributeOldValue: true });

    const colSpanAttributes = Object.values(this.attributes).filter(attr => attr.name.startsWith('col-span'));

    colSpanAttributes.forEach(attr => {
      this.style.setProperty(`--${attr.name}`, attr.value);
    });
  }

  static styles = styles;
}

export default DDSStructuredList;

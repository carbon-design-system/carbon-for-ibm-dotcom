import { LitElement, html } from 'lit-element';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './tile.scss';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The Tile Group component.
 *
 * @element c4d-tile-group
 */
@customElement(`${c4dPrefix}-tile-group`)
class C4DTileGroup extends LitElement {
  render() {
    return html`
      <div class="${c4dPrefix}-tile-group">
        <slot></slot>
      </div>
    `;
  }
  static styles = styles;
}

export default C4DTileGroup;

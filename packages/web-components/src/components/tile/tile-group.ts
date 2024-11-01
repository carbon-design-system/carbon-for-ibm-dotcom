import { LitElement, html } from 'lit-element';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import settings from '../../globals/settings';
import styles from './tile.scss';

const { stablePrefix: caemPrefix } = settings;

/**
 * The Tile Group component.
 *
 * @element caem-tile-group
 */
@customElement(`${caemPrefix}-tile-group`)
class CAEMTileGroup extends LitElement {
  render() {
    return html`
      <div class="${caemPrefix}-tile-group">
        <slot></slot>
      </div>
    `;
  }
  static styles = styles;
}

export default CAEMTileGroup;

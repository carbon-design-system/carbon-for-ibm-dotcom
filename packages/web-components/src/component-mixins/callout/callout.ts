/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import { Constructor } from '../../globals/defs';

const { prefix } = settings;

/**
 * Callout.
 *
 * @mixin dds-callout
 */
const DDSCalloutMixin = <T extends Constructor<HTMLElement>>(base: T) => {
  return class extends base {
    render() {
      return html`
        <div class="${prefix}--callout__column">
          <div class="${prefix}--callout__content">
            ${
              /* Declaring this mixin as it extends \`LitElement\` seems to cause a TS error
            // @ts-ignore */
              super.render()
            }
          </div>
        </div>
      `;
    }
  };
};

export default DDSCalloutMixin;

/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { Constructor } from '../../globals/defs';

const { prefix } = settings;

/**
 * Callout.
 *
 * @mixin c4d-callout
 */
const C4DCalloutMixin = <T extends Constructor<HTMLElement>>(base: T) => {
  abstract class CalloutMixin extends base {
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
  }

  return CalloutMixin;
};

export default C4DCalloutMixin;

/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowDown20 from '../../internal/vendor/@carbon/web-components/icons/arrow--down/20.js';
import ArrowRight20 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import Download20 from '../../internal/vendor/@carbon/web-components/icons/download/20.js';
import Launch20 from '../../internal/vendor/@carbon/web-components/icons/launch/20.js';
import PlayOutline20 from '../../internal/vendor/@carbon/web-components/icons/play--outline/20.js';
import { Constructor } from '../../globals/defs';
import { CTA_TYPE } from '../../components/cta/defs';

/**
 * Icons to use, keyed by CTA type.
 */
export const icons = {
  [CTA_TYPE.LOCAL]: ArrowRight20,
  [CTA_TYPE.DOWNLOAD]: Download20,
  [CTA_TYPE.EXTERNAL]: Launch20,
  [CTA_TYPE.JUMP]: ArrowDown20,
  [CTA_TYPE.VIDEO]: PlayOutline20,
};

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic of handling link for CTA.
 */
const VideoCTAMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class VideoCTAMixinImpl extends Base {
    /**
     * Handles `.updated()` method of `lit-element`.
     */
    updated(changedProperties) {
      // Declaring this mixin as it extends `LitElement` seems to cause a TS error
      // @ts-ignore
      super.updated(changedProperties);
    }
  }

  return VideoCTAMixinImpl;
};

export type VideoCTAMixinImpl = InstanceType<ReturnType<typeof VideoCTAMixin>>;

export default VideoCTAMixin;

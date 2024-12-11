/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { Constructor } from '../../globals/defs';
import C4DTab from '../../components/tabs-extended/tab';

const { stablePrefix: c4dPrefix } = settings;

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic for handling elements that need to
 *   respond when a potential parent element becomes visible.
 * @deprecated This mixin will be removed in a future release.
 */
const ParentVisibilityMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class ParentVisibilityMixinImpl extends Base {
    /**
     * The method that is invoked when a parent becomes visible.
     */
    abstract _onParentVisible(): void;

    /**
     * Handles `.connectedCallback()` method of `lit-element`.
     */
    connectedCallback() {
      // @ts-ignore
      super.connectedCallback();

      const { parentsThatHide } = this
        .constructor as typeof ParentVisibilityMixinImpl;

      Object.entries(parentsThatHide).forEach(([component, event]) => {
        let target: Element | null | undefined = this.closest(component);
        while (target) {
          target.addEventListener(event, this._onParentVisible.bind(this));
          target = target?.parentElement?.closest(component);
        }
      });
    }

    /**
     * A list of potential parent components that may be hide their content on
     * first render. Lists event names that indicate the parent element
     * visibility has changed keyed by component selector strings.
     */
    static get parentsThatHide() {
      return {
        [`${c4dPrefix}-tab`]: C4DTab.eventTabSelected,
      };
    }
  }

  return ParentVisibilityMixinImpl;
};

export type ParentVisibilityMixinImpl = InstanceType<
  ReturnType<typeof ParentVisibilityMixin>
>;

export default ParentVisibilityMixin;

/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * HoC wrapper to add deprecation warnings to components.
 *
 * @param {object} component to render deprecated component
 * @param {string} message displays optional custom deprecation message
 * @private
 * @returns {object} JSX component
 *
 * export default deprecate(Component, `This is a custom deprecation message`);
 */
export default function deprecate(component, message) {
  console.warn(
    message ||
      `The ${component.name} component has been deprecated. Please consult the release notes for more information.`
  );
  return component;
}

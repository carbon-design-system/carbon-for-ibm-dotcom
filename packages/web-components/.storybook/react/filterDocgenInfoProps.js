/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Filteres out internal properties from React Docgen info.
 *
 * @param {React.Component} Component The component.
 * @returns {React.Component} The given component.
 */
function filterDocgenInfoProps(Component) {
  const { __docgenInfo: docgenInfo } = Component;
  docgenInfo.props = Object.keys(docgenInfo.props).reduce(
    (acc, key) =>
      /@internal/i.test(docgenInfo.props[key].description)
        ? acc
        : {
            ...acc,
            [key]: docgenInfo.props[key],
          },
    {}
  );
  return Component;
}

export default filterDocgenInfoProps;

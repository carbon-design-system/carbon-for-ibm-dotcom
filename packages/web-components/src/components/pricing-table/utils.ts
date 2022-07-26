/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DDSPricingTableHeaderRow from './pricing-table-header-row';
import DDSPricingTableRow from './pricing-table-row';

/**
 * Sets a CSS custom property on the given row that indicates the default
 * number of columns each of that row's cells row should span.
 */
export const setColumnWidth = (row: DDSPricingTableHeaderRow | DDSPricingTableRow) => {
  const columnCount = row.children.length;
  let defaultColumnWidth: string;
  if (columnCount >= 6) {
    defaultColumnWidth = '2';
  } else if (columnCount >= 4) {
    defaultColumnWidth = '3';
  } else {
    defaultColumnWidth = '4';
  }
  row.style.setProperty('--default-cols', defaultColumnWidth);
};

/**
 * Animates an element hidden.
 */
export const slideHidden = (element: HTMLElement) => {
  const height = element.scrollHeight;

  // Store height values set by other scripts.
  if (element.style.height) {
    element.dataset.originalHeight = element.style.height;
  }

  requestAnimationFrame(() => {
    element.style.height = `${height}px`;
    element.style.opacity = '1';

    requestAnimationFrame(() => {
      element.style.height = '0px';
      element.style.opacity = '0';
    });
  });
};

/**
 * Animates an element visible.
 */
export const slideUnhidden = (element: HTMLElement) => {
  const { originalHeight } = element.dataset;

  requestAnimationFrame(() => {
    element.style.height = originalHeight || `${element.scrollHeight}px`;
    element.style.opacity = '1';
  });

  element.addEventListener(
    'transitionend',
    () => {
      element.style.height = originalHeight || '';
      element.style.opacity = '';
    },
    { once: true }
  );
};

/**
 * Splits a style attribute string into an object full of properties and values.
 */
export const convertStyleToObject = (styleString: string): {} => {
  return styleString.split(';').reduce((acc, styleRule) => {
    if (styleRule !== '') {
      const pair = styleRule.split(':');
      acc[pair[0].trim()] = pair[1].trim();
    }
    return acc;
  }, {});
};

export default setColumnWidth;

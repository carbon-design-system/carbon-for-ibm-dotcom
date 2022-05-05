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

export const slideHidden = (element: HTMLElement) => {
  const height = element.scrollHeight;
  const { transition } = element.style;
  element.style.transition = '';

  requestAnimationFrame(() => {
    element.style.transition = transition;
    element.style.height = `${height}px`;
    element.style.opacity = '1';

    requestAnimationFrame(() => {
      element.style.height = '0px';
      element.style.opacity = '0';
    });
  });
};

export const slideUnhidden = (element: HTMLElement) => {
  requestAnimationFrame(() => {
    const height = element.scrollHeight;
    element.style.height = `${height}px`;
    element.style.opacity = '1';
  });

  element.addEventListener(
    'transitionend',
    () => {
      element.style.height = '';
      element.style.opacity = '';
    },
    { once: true }
  );
};

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

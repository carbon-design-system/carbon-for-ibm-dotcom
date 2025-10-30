/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import C4DPricingTableHeaderRow from './pricing-table-header-row';
import C4DPricingTableRow from './pricing-table-row';
import { breakpoints as BXBreakpoints } from '@carbon/layout';

/**
 * Converts REM to PX
 * Ex: '2rem' will output '32'
 */
const remToPx = (rem) =>
  rem.slice(0, -3) *
  parseFloat(getComputedStyle(document.documentElement).fontSize);

/**
 * Checks if the screen resolution is Large or Greater
 */
function isLargeOrGreater() {
  const windowWidth = window.innerWidth;

  return windowWidth >= remToPx(BXBreakpoints.lg.width);
}

/**
 * Sets a CSS custom property on the given row that indicates the default
 * number of columns each of that row's cells row should span.
 */
export const setColumnWidth = (
  row: C4DPricingTableHeaderRow | C4DPricingTableRow
) => {
  const columnCount = row.children.length;
  let defaultColumnWidth: string;
  if (columnCount >= 6) {
    //If we have more 5 columns, we set 4 as the default column width in Large and greater resolutions
    // to enable scroll and avoid content being squished by narrow coluns
    defaultColumnWidth = isLargeOrGreater() ? '4' : '2';
  } else if (columnCount >= 4) {
    defaultColumnWidth = '3';
  } else {
    defaultColumnWidth = '4';
  }
  row.style.setProperty('--default-cols', defaultColumnWidth);
};

let resizeTimeout: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    document
      .querySelectorAll<C4DPricingTableHeaderRow | C4DPricingTableRow>(
        'c4d-pricing-table-header-row, c4d-pricing-table-row'
      )
      .forEach((row) => setColumnWidth(row));
  }, 150);
});

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
export const convertStyleToObject = (styleString: string): object => {
  return styleString.split(';').reduce((acc, styleRule) => {
    if (styleRule !== '') {
      const pair = styleRule.split(':');
      acc[pair[0].trim()] = pair[1].trim();
    }
    return acc;
  }, {});
};

export default setColumnWidth;

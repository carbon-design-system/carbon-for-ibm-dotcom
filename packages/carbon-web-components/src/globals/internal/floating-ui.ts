/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { computePosition, flip, offset, arrow } from '@floating-ui/dom';
import { Placement } from '@floating-ui/utils';

/**
 * Utilitize @floating-ui/dom library to compute positioning
 * of tooltip and caret
 *
 * @param object
 * @param {node} object.button trigger element
 * @param {node} object.tooltip tooltip / popover element
 * @param {node} object.arrowElement caret element
 * @param {boolean} object.caret if caret is visible
 * @param {string} object.alignment alignment to display tooltip
 *
 */
export function floatingUIPosition({
  button,
  tooltip,
  arrowElement,
  caret = false,
  alignment = 'bottom',
}) {
  let shimmedAlign;
  switch (alignment) {
    case 'top-left':
      shimmedAlign = 'top-start';
      break;
    case 'top-right':
      shimmedAlign = 'top-end';
      break;
    case 'bottom-left':
      shimmedAlign = 'bottom-start';
      break;
    case 'bottom-right':
      shimmedAlign = 'bottom-end';
      break;
    case 'left-bottom':
      shimmedAlign = 'left-end';
      break;
    case 'left-top':
      shimmedAlign = 'left-start';
      break;
    case 'right-bottom':
      shimmedAlign = 'right-end';
      break;
    case 'right-top':
      shimmedAlign = 'right-start';
      break;
    default:
      shimmedAlign = alignment;
      break;
  }

  computePosition(button, tooltip, {
    strategy: 'fixed',
    middleware: [
      flip({ fallbackAxisSideDirection: 'start' }),
      offset(caret ? 10 : 0),
      arrow({ element: arrowElement }),
    ],
    placement: shimmedAlign as Placement,
  }).then(({ x, y, placement, middlewareData }) => {
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;

    if (arrowElement) {
      // @ts-ignore
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide: any = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]];

      arrowElement.style.left = arrowX != null ? `${arrowX}px` : '';
      arrowElement.style.top = arrowY != null ? `${arrowY}px` : '';
      arrowElement.style.right = '';
      arrowElement.style.bottom = '';
      arrowElement.style[staticSide] = `${-arrowElement.offsetWidth / 2}px`;
    }
  });
}

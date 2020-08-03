/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import on from 'carbon-components/es/globals/js/misc/on';

/**
 * Fires the given event if focus goes out of the given element.
 *
 * @param {Element} element The element to monitor the focus on.
 * @param {Element[]} sentinelNodes
 *   The focus sentinel nodes.
 *   If these nodes gets focus, we see it as focus went out of the `element`.
 * @param {string} [eventRequestFocusWrap=dds-request-focus-wrap] The event name.
 * @returns {Handle} The handle to remove the event handler.
 */
function focuswrap(
  element,
  sentinelNodes,
  eventRequestFocusWrap = 'dds-request-focus-wrap'
) {
  return on(element, 'focusout', function handleFocusout(event) {
    const { target, relatedTarget } = event;
    const [startSentinelNode, endSentinelNode] = sentinelNodes;
    const oldContains =
      target &&
      target !== this &&
      (event.currentTarget.contains(target) ||
        event.currentTarget.host?.contains(target)) &&
      sentinelNodes.indexOf(target) < 0;
    const currentContains =
      relatedTarget &&
      relatedTarget !== this &&
      (event.currentTarget.contains(relatedTarget) ||
        event.currentTarget.host?.contains(relatedTarget)) &&
      sentinelNodes.indexOf(relatedTarget) < 0;
    if (oldContains && !currentContains) {
      let comparisonResult = target.compareDocumentPosition(relatedTarget);
      if (relatedTarget === startSentinelNode) {
        comparisonResult = Node.DOCUMENT_POSITION_PRECEDING;
      }
      if (relatedTarget === endSentinelNode) {
        comparisonResult = Node.DOCUMENT_POSITION_FOLLOWING;
      }
      element.dispatchEvent(
        new CustomEvent(eventRequestFocusWrap, {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            comparisonResult,
          },
        })
      );
    }
  });
}

export default focuswrap;

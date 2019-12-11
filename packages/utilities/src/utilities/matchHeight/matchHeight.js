/**
 * Get Max height of given elements
 *
 * @private
 * @param {*} els elements selector
 * @returns {number} the max height between elements
 */
const getMaxHeight = els => {
  return Array.prototype.map
    .call(els, el => el.scrollHeight)
    .reduce((pre, cur) => Math.max(pre, cur), -Infinity);
};

/**
 * Match heights of child elements
 *
 * @private
 * @param {*} parentEl Parent element selector
 */
const matchHeight = parentEl => {
  const parentEls = document.querySelectorAll(parentEl);
  parentEls.forEach(parentEl => {
    const childEls = parentEl.childNodes;
    childEls.forEach(el => {
      el.style.height = null;
    });
    const maxHeight = getMaxHeight(childEls);
    childEls.forEach(el => {
      el.style.height = maxHeight + 'px';
    });
  });
};

export { matchHeight, getMaxHeight };

/**
 * Helper function for rendering feature flag
 *
 * @param {string} flag identifies which flag is used
 * @param {object} jsx pass in the jsx to render conditionally
 * @private
 * @returns {object} JSX object
 *
 * return featureFlag(DDS_FEATURE_NAME, <div>hello world</div>);
 *
 */
function featureFlag(flag, jsx) {
  return flag ? jsx : null;
}

export default featureFlag;

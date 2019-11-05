import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags.js';

/**
 * Helper function for rendering feature flag
 *
 * @param {string} flag identifies which flag is used
 * @param {Function|object} cb pass in a function or jsx to render conditionally
 * @private
 * @returns {*} returns what you pass in unless condition fails
 *
 * return featureFlag(FOOTER_LOCALE_BUTTON, <div>hello world</div>);
 *
 */
function featureFlag(flag, cb) {
  if (flag || DDS_FLAGS_ALL) {
    if (typeof cb === 'function') {
      return cb(flag);
    }

    return cb;
  }

  return null;
}

export default featureFlag;

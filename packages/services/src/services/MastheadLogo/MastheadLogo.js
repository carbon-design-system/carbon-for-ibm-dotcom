/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

class MastheadLogoAPI {
  /**
   * Determines whether to return custom or default IBM logo
   *
   * @returns {string} IBM logo
   *
   * @example
   * import {MastheadLogoAPI} from '@carbon/ibmdotcom-services';
   *
   * const useCustomLogo = mastheadProps.mastheadLogo
   *   ? MastheadLogoAPI.setMastheadLogo(mastheadProps.mastheadLogo)
   *   : false;
   */
  static setMastheadLogo(logoData) {
    if (logoData === undefined) return false;

    const currentTime = new Date().getTime();
    const expireTime = logoData.expire
      ? new Date(logoData.expire).getTime()
      : null;
    const isExpired = expireTime && currentTime > expireTime ? true : false;

    if (
      logoData.svg === null ||
      isExpired ||
      (logoData.denylist && logoData.denylist.indexOf(location.pathname) !== -1)
    ) {
      return false;
    } else if (
      logoData.allowlist &&
      logoData.allowlist.indexOf(location.pathname) !== -1 &&
      logoData.svg
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default MastheadLogoAPI;

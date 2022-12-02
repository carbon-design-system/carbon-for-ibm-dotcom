/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

class MastheadLogoAPI {
  /**
   * Determines whether to return custom or default IBM logo
   *
   * @returns {boolean} Use alternate logo or not
   * @example
   * import { MastheadLogoAPI } from '@carbon/ibmdotcom-services';
   *
   * const useAlternateLogo = MastheadLogoAPI.setMastheadLogo(logoData);
   */
  static setMastheadLogo(logoData) {
    if (logoData === undefined) return false;

    const currentTime = new Date().getTime();
    const expireTime = logoData.end ? Date.parse(logoData.end) : null;
    const isExpired = expireTime && currentTime > expireTime ? true : false;

    if (
      logoData.svg === null ||
      isExpired ||
      (logoData.denylist && logoData.denylist.indexOf(location.pathname) !== -1)
    ) {
      return false;
    } else if (
      logoData.allowlist &&
      (logoData.allowlist.length == 0 ||
        logoData.allowlist.indexOf(location.pathname) !== -1) &&
      logoData.svg
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default MastheadLogoAPI;

/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useEffect, FunctionComponent } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { BUTTON_KIND } from 'carbon-web-components/es/components/button/button.js';
import BXBtn from 'carbon-web-components/es/components-react/button/button.js';
import BXModalCloseButton from 'carbon-web-components/es/components-react/modal/modal-close-button.js';
import BXModalHeader from 'carbon-web-components/es/components-react/modal/modal-header.js';
import BXModalFooter from 'carbon-web-components/es/components-react/modal/modal-footer.js';
import { LeavingIBMLabels, Translation } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSLeavingIbmModal from './leaving-ibm-modal';
// @ts-ignore
import DDSLeavingIbmModalBody from './leaving-ibm-modal-body';
// @ts-ignore
import DDSLeavingIbmModalHeading from './leaving-ibm-modal-heading';

const { stablePrefix: ddsPrefix } = ddsSettings;

export interface DDSLeavingIbmCompositeProps {
  /**
   * external url triggering the leaving ibm modal.
   */
  href?: string;

  /**
   * Leaving IBM modal copy
   */
  leavingIbmCopy?: LeavingIBMLabels;

  /**
   * Leaving IBM modal button label
   */
  leavingIbmButtonLabel?: string;

  /**
   * The language used for query.
   */
  language?: string;

  /**
   * `true` to open the modal.
   */
  open?: boolean;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;
}

/**
 * Component that rendres masthead from links, etc. data.
 */
const DDSLeavingIbmComposite: FunctionComponent<DDSLeavingIbmCompositeProps> = ({
  href,
  leavingIbmButtonLabel,
  leavingIbmCopy,
  language,
  open,
  _loadTranslation: loadTranslation,
  _setLanguage: setLanguage,
}) => {
  useEffect(() => {
    if (language) {
      setLanguage?.(language);
    }
  }, [language, setLanguage]);

  useEffect(() => {
    loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
  }, [language, loadTranslation]);

  return (
    <DDSLeavingIbmModal open={open}>
      <BXModalHeader>
        <BXModalCloseButton></BXModalCloseButton>
        <DDSLeavingIbmModalHeading>{leavingIbmCopy?.LEAVING001}</DDSLeavingIbmModalHeading>
      </BXModalHeader>
      <DDSLeavingIbmModalBody href={href}>
        <p>{leavingIbmCopy?.LEAVING002}</p>
        <slot name="supplemental">{leavingIbmCopy?.LEAVING003}</slot>
      </DDSLeavingIbmModalBody>
      <BXModalFooter>
        <BXBtn data-autoid={`${ddsPrefix}--leaving-ibm-cta`} href={href} kind={BUTTON_KIND.PRIMARY}>
          {leavingIbmButtonLabel}
        </BXBtn>
      </BXModalFooter>
    </DDSLeavingIbmModal>
  );
};

DDSLeavingIbmComposite.propTypes = {
  /**
   * external url triggering the leaving ibm modal.
   */
  href: PropTypes.string,

  /**
   * Leaving IBM modal button label
   */
  leavingIbmButtonLabel: PropTypes.string,

  /**
   * Leaving IBM modal copy
   */
  leavingIbmCopy: PropTypes.shape({
    LEAVING001: PropTypes.string.isRequired,
    LEAVING002: PropTypes.string.isRequired,
    LEAVING003: PropTypes.string.isRequired,
  }),

  /**
   * The language used for query.
   */
  language: PropTypes.string,

  /**
   * `true` to open the modal.
   */
  open: PropTypes.bool,

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation: PropTypes.func,

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage: PropTypes.func,
};

DDSLeavingIbmComposite.defaultProps = {
  leavingIbmButtonLabel: '',
  leavingIbmCopy: { LEAVING001: '', LEAVING002: '', LEAVING003: '' },
};

export default DDSLeavingIbmComposite;

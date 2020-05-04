/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ButtonCTA from './ButtonCTA';
import CardCTA from './CardCTA';
import FeatureCTA from './FeatureCTA';
import PropTypes from 'prop-types';
import TextCTA from './TextCTA';
import { useVideoData } from '../../internal/hooks/useVideoData';

/**
 * CTA component
 *
 * @param {object} props props object
 * @param {string} props.style cta style ( text | card | button | feature ).
 * @param {string} props.type cta type ( jump | local | external ).
 * @param {string} props.customClassName custom classname from parent
 * @returns {*} CTA component
 */
const CTA = ({ style, type, customClassName, ...otherProps }) => {
  const [renderLightBox, openLightBox] = useState(false);

  const videoTitle = useVideoData(otherProps, style, type);

  const CTAComponent =
    style === 'card'
      ? CardCTA
      : style === 'button'
      ? ButtonCTA
      : style === 'feature'
      ? FeatureCTA
      : TextCTA;

  const ctaProps = {
    style,
    type,
    renderLightBox,
    openLightBox,
    videoTitle,
    ...otherProps,
  };

  return (
    <div className={customClassName}>
      <CTAComponent {...ctaProps} />
    </div>
  );
};

CTA.propTypes = {
  style: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  customClassName: PropTypes.string,
};

export default CTA;

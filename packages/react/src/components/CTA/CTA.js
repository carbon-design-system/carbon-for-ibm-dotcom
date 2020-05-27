/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ButtonCTA from './ButtonCTA';
import CardCTA from './CardCTA';
import CTALogic from './CTALogic';
import FeatureCTA from './FeatureCTA';
import PropTypes from 'prop-types';
import TextCTA from './TextCTA';
import { useVideoData } from '../../internal/hooks/useVideoData';

/**
 * CTA component.
 */
const CTA = ({ style, type, customClassName, ...otherProps }) => {
  const [renderLightBox, openLightBox] = useState(false);

  const videoId =
    type && (type === 'video' || type.includes('video'))
      ? CTALogic.getVideoId(style, otherProps)
      : [];
  const videoTitle = useVideoData(type, videoId);

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
  /**
   * CTA style. Choose from:
   *
   * | Style     | Component Name | Description                                                                                                                                 |
   * | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `text`    | LinkWithIcon   | Use their props here. For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-link-with-icon--default)!👀 |
   * | `button`  | ButtonGroup    | Use their props here. For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-buttongroup--default)!👀    |
   * | `card`    | Card           | Use their props here. For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-card--link)!👀              |
   * | `feature` | FeatureCard    | Use their props here. For more details [see here](https://ibmdotcom-react.mybluemix.net/?path=/story/components-card--link)!👀              |
   */
  style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),

  /**
   * CTA type. Choose from:
   *
   * | Type       | SVG element Name | Description                                                      |
   * | ---------- | ---------------- | ---------------------------------------------------------------- |
   * | `local`    | ArrowRight20     | Describes right arrow onClick which loads in self page.          |
   * | `jump`     | ArrowDown20      | Describes down arrow onClick which scrollToView of target.       |
   * | `external` | Launch20         | Describes launch arrow onClick which loads in new tab.           |
   * | `download` | Download20       | Describes download arrow onClick for downloading files.          |
   * | `video`    | PlayOutline20    | Describes play icon onClick which loads the video in a lightbox. |
   *
   * For more details of icons, refer to:
   *
   * - [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
   * - [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)!👀
   * - [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀
   */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
    PropTypes.arrayOf(
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
    ),
  ]),

  /**
   * Custom classname from parent.
   */
  customClassName: PropTypes.string,
};

export default CTA;

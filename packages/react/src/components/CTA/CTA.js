/**
 * Copyright IBM Corp. 2016, 2022
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
const CTA = ({ style, type, size, customClassName, ...otherProps }) => {
  const [renderLightBox, openLightBox] = useState(false);

  const customVideoData =
    style === 'feature' ? otherProps?.card?.cta?.media : otherProps.media;

  const videoId =
    type && (type === 'video' || type.includes('video'))
      ? CTALogic.getVideoId(style, otherProps)
      : [];
  const videoTitle = useVideoData(type, videoId, customVideoData?.title);

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
    size,
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
   * Size of Feature Card. Choose from:
   *
   * | Name    | Description                                                  |
   * | ------- | -------------------------------------------------------------|
   * | `medium`| Default Feature Card variant                                 |
   * | `large` | Large Feature Card variant that contains eyebrow and heading |
   */
  size: PropTypes.oneOf(['medium', 'large']),

  /**
   * CTA style. Choose from:
   *
   * | Style     | Component Name | Description                                                                                                                                 |
   * | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `text`    | LinkWithIcon   | For more details [see here](https://www.ibm.com/standards/carbon/react/?path=/story/components-link-with-icon--default)!👀 |
   * | `button`  | ButtonGroup    | For more details [see here](https://www.ibm.com/standards/carbon/react/?path=/story/components-buttongroup--default)!👀    |
   * | `card`    | Card           | For more details [see here](https://www.ibm.com/standards/carbon/react/?path=/story/components-card--link)!👀              |
   * | `feature` | FeatureCard    | For more details [see here](https://www.ibm.com/standards/carbon/react/?path=/story/components-card--link)!👀              |
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
   * | `default`  | None             | Describes the default CTA - without icon                         |
   *
   * For more details of icons, refer to:
   *
   * - [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
   * - [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react)!👀
   * - [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀
   */
  type: PropTypes.oneOfType([
    PropTypes.oneOf([
      'jump',
      'local',
      'external',
      'download',
      'video',
      'default',
    ]),
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'jump',
        'local',
        'external',
        'download',
        'video',
        'default',
      ])
    ),
  ]),

  /**
   * Optional text for CTA.
   * Used for ones except `style="feature"`.
   */
  copy: PropTypes.string,

  /**
   * Valid URL for a the location of an internal or external resource.
   * Used for `style="text"`.
   */
  href: PropTypes.string,

  /**
   * Custom classname from parent.
   */
  customClassName: PropTypes.string,
};

CTA.defaultProps = {
  style: 'text',
  type: 'default',
  copy: '',
  href: '',
  customVideoTitle: null,
};

export default CTA;

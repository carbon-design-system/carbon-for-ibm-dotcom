/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CTALogic from './CTALogic';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Link subcomponent for CTA.
 */
const TextCTA = ({
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  formatCTAcopy,
  ...otherProps
}) => {
  const href =
    type !== 'video'
      ? otherProps.href
        ? otherProps.href
        : otherProps.cta?.href
      : null;
  return type === 'video' ? (
    <div>
      {CTALogic.launchLightBox(renderLightBox, openLightBox, otherProps.media)}
      {!renderLightBox && (
        <LinkWithIcon
          href="#"
          type={type}
          onClick={e => CTALogic.setLightBox(e, openLightBox)}>
          <span>
            {formatCTAcopy({
              title: videoTitle[0].title,
              duration: videoTitle[0].duration,
            })}
          </span>
        </LinkWithIcon>
      )}
    </div>
  ) : (
    <LinkWithIcon
      href={href}
      target={CTALogic.external(type)}
      copy={otherProps.copy}
      type={type}
      onClick={e => CTALogic.jump(e, type)}></LinkWithIcon>
  );
};

TextCTA.propTypes = {
  /**
   * CTA type. Choose from:
   *
   * | Type       | SVG element Name | Description                                                      |
   * | ---------- | ---------------- | ---------------------------------------------------------------- |
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
    PropTypes.oneOf(['jump', 'external', 'download', 'video']),
    PropTypes.arrayOf(
      PropTypes.oneOf(['jump', 'external', 'download', 'video'])
    ),
  ]),

  /**
   * Func to set renderLightBox state.
   */
  openLightBox: PropTypes.func,

  /**
   * Bool to determine whether to open lightbox.
   */
  renderLightBox: PropTypes.bool,

  /**
   * Array of video titles.
   */
  videoTitle: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      duration: PropTypes.string,
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),

  /**
   * Func to format the cta copy
   */
  formatCTAcopy: PropTypes.func,
};

TextCTA.defaultProps = {
  type: 'default',
  formatCTAcopy: ({ title, duration }) => `${title} ${duration}`,
};

export default TextCTA;

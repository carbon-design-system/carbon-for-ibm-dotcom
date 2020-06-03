/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CardLink } from '../CardLink';
import CTALogic from './CTALogic';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

const { prefix } = settings;

/**
 * Card subcomponent for CTA.
 */
const CardCTA = ({
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  ...otherProps
}) => {
  // eslint-disable-next-line no-unused-vars
  const { style, ...cardProps } = otherProps;

  if (type === 'video') {
    // use image src if passed in through props, otherwise use Kaltura's generated thumbnail image
    const image = cardProps.image
      ? cardProps.image
      : {
          defaultSrc: VideoPlayerAPI.getThumbnailUrl({
            videoId: cardProps.media?.src,
            width: '320',
          }),
          alt: videoTitle[0].title,
        };

    return (
      <>
        {CTALogic.launchLightBox(
          renderLightBox,
          openLightBox,
          otherProps.media
        )}
        {!renderLightBox && (
          <CardLink
            customClassName={`${prefix}--card__video`}
            card={{
              ...cardProps,
              cta: {
                href: '#',
                icon: {
                  src: CTALogic.iconSelector(type),
                },
                copy: videoTitle[0].duration.replace(/\(|\)/g, ''),
              },
              image: image,
              copy: videoTitle[0].title,
              handleClick: e => CTALogic.setLightBox(e, openLightBox),
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <CardLink
        card={{
          ...cardProps,
          cta: {
            type,
            href: otherProps.cta.href,
            icon: {
              src: CTALogic.iconSelector(type),
            },
          },
          copy: otherProps.copy,
          target: CTALogic.external(type),
        }}
      />
    );
  }
};

CardCTA.propTypes = {
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
};

export default CardCTA;

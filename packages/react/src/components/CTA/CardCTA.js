/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useState } from 'react';
import { CardLink } from '../CardLink';
import CTALogic from './CTALogic';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer';
import PlayIcon from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Card subcomponent for CTA.
 */
const CardCTA = ({
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  disableImage,
  ...otherProps
}) => {
  // eslint-disable-next-line no-unused-vars
  const { style, ...cardProps } = otherProps;

  const [thumbnailSize, setThumbnailSize] = useState(3);

  const refImage = useCallback((node) => {
    if (node?.parentElement) {
      setThumbnailSize(node.parentElement.offsetWidth);
    }
  }, []);

  if (type === 'video') {
    let image;
    if (!disableImage) {
      // use image src if passed in through props, otherwise use Kaltura's generated thumbnail image
      image = cardProps.image
        ? cardProps.image
        : {
            defaultSrc: KalturaPlayerAPI.getThumbnailUrl({
              mediaId: cardProps.media?.src,
              width: thumbnailSize,
            }),
            alt: videoTitle[0].title,
          };
      image = { ...image, icon: PlayIcon, refImage };
    }

    return (
      <>
        {CTALogic.launchLightBox(
          renderLightBox,
          openLightBox,
          otherProps.media
        )}
        {!renderLightBox && (
          <CardLink
            customClassName={`${prefix}--card__CardCTA ${prefix}--card__video`}
            card={{
              ...cardProps,
              cta: {
                href: '#',
                icon: {
                  src: CTALogic.iconSelector(type),
                },
                iconPlacement: 'left',
                copy: videoTitle[0].duration?.replace(/\(|\)/g, ''),
                handleClick: (e) => CTALogic.setLightBox(e, openLightBox),
              },
              image: image,
              heading: videoTitle[0].title,
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <CardLink
        customClassName={`${prefix}--card__CardCTA`}
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
          href: otherProps.cta.href,
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
   * Boolean to determine whether to disable image for card
   */
  disableImage: PropTypes.bool,
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

CardCTA.defaultProps = {
  type: 'default',
  copy: '',
  cta: null,
  disableImage: false,
  media: null,
};

export default CardCTA;

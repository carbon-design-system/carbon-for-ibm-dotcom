/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlock from '../ContentBlock/ContentBlock';
import { ContentGroupSimple } from '../ContentGroupSimple';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - segmented pattern.
 */
const ContentBlockMedia = ({ copy, heading, items, cta, aside, border }) => {
  if (cta) cta.style = 'feature';

  const content = items.map((item, index) => {
    return <ContentGroupSimple key={index} {...item} />;
  });

  return (
    <div
      data-autoid={`${stablePrefix}--content-block-media`}
      className={`${prefix}--content-block-media`}
    >
      <ContentBlock
        heading={heading}
        copy={copy}
        cta={cta}
        aside={aside}
        border={border}
      >
        {content}
      </ContentBlock>
    </div>
  );
};

ContentBlockMedia.propTypes = {
  /**
   * Short copy to suppport title.
   */
  copy: PropTypes.string,

  /**
   * Main title of `<ContentBlockMedia>`.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Array of content items objects to render.
   * Each items have the following structure in summary:
   *
   * | Name        | Required | Data Type | Description                                                                                                                                                                        |
   * | ----------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading`   | YES      | String    | Describes the block that it is a part of.                                                                                                                                          |
   * | `mediaData` | YES      | Object    | See `mediaData` below.                                                                                                                                                             |
   * | `cta`       | NO       | Object    | See the [`<CTA>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#props) for full usage details. |
   *
   * `mediaData`:
   *
   * | Name      | Description                                                                                                                            |
   * | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | Describes the media section                                                                                                            |
   * | `image`   | See See [`<Image>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-image--default#props) for full usage details. |
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      mediaType: PropTypes.oneOf(['image', 'video']),
      mediaData: PropTypes.oneOfType([
        PropTypes.shape({
          inverse: PropTypes.bool,
          image: PropTypes.shape({
            classname: PropTypes.string,
            sources: PropTypes.arrayOf(
              PropTypes.shape({
                src: PropTypes.string,
                breakpoint: PropTypes.oneOfType([
                  PropTypes.string,
                  PropTypes.number,
                ]),
              })
            ),
            defaultSrc: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
            longDescription: PropTypes.string,
          }).isRequired,
          lightbox: PropTypes.bool,
          heading: PropTypes.string,
          copy: PropTypes.string,
          customClassName: PropTypes.string,
        }),
        PropTypes.shape({
          customClassName: PropTypes.string,
          videoId: PropTypes.string.isRequired,
          showCaption: PropTypes.bool,
          inverse: PropTypes.bool,
        }),
      ]).isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          cta: PropTypes.shape({
            style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
            type: PropTypes.oneOfType([
              PropTypes.oneOf([
                'jump',
                'local',
                'external',
                'download',
                'video',
              ]),
              PropTypes.arrayOf(
                PropTypes.oneOf([
                  'jump',
                  'local',
                  'external',
                  'download',
                  'video',
                ])
              ),
            ]),
            heading: PropTypes.string,
            href: PropTypes.string,
            customClassName: PropTypes.string,
          }),
          customClassName: PropTypes.string,
          copy: PropTypes.string,
          heading: PropTypes.string,
          mediaType: PropTypes.oneOf(['image', 'video']),
          mediaData: PropTypes.oneOfType([
            PropTypes.shape({
              inverse: PropTypes.bool,
              image: PropTypes.shape({
                classname: PropTypes.string,
                sources: PropTypes.arrayOf(
                  PropTypes.shape({
                    src: PropTypes.string,
                    breakpoint: PropTypes.oneOfType([
                      PropTypes.string,
                      PropTypes.number,
                    ]),
                  })
                ),
                defaultSrc: PropTypes.string.isRequired,
                alt: PropTypes.string.isRequired,
                longDescription: PropTypes.string,
              }).isRequired,
              lightbox: PropTypes.bool,
              heading: PropTypes.string,
              copy: PropTypes.string,
              customClassName: PropTypes.string,
            }),
            PropTypes.shape({
              customClassName: PropTypes.string,
              videoId: PropTypes.string.isRequired,
              showCaption: PropTypes.bool,
              inverse: PropTypes.bool,
            }),
          ]),
          inverse: PropTypes.bool,
        })
      ).isRequired,
      cta: PropTypes.shape({
        style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
        type: PropTypes.oneOfType([
          PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
          PropTypes.arrayOf(
            PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
          ),
        ]),
        heading: PropTypes.string,
        href: PropTypes.string,
        customClassName: PropTypes.string,
      }),
    })
  ).isRequired,

  /**
   * Optional CTA. Must be `Feature Link`.
   * See the [`<CTA>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['feature']),
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
      ),
    ]),
    heading: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string,
  }),

  /**
   * Object containing elements to be rendered within <aside> html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: PropTypes.object,

  /**
   * border for content block.
   */
  border: PropTypes.bool,
};

export default ContentBlockMedia;

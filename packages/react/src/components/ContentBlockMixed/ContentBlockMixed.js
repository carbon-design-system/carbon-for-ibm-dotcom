/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlock from '../ContentBlock/ContentBlock';
import { ContentGroupCards } from '../ContentGroupCards';
import { ContentGroupPictograms } from '../ContentGroupPictograms';
import { ContentGroupSimple } from '../ContentGroupSimple';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockMixed Pattern.
 */
const ContentBlockMixed = ({ heading, copy, cta, items, aside, border }) => {
  const patterns = {
    ContentGroupCards,
    ContentGroupSimple,
    ContentGroupPictograms,
  };
  const groups = items.map((item, index) => {
    const Pattern = patterns[item.type];
    return <Pattern key={index} {...item} />;
  });

  return (
    <div
      data-autoid={`${stablePrefix}--content-block-mixed`}
      className={`${prefix}--content-block-mixed`}
    >
      <ContentBlock
        heading={heading}
        copy={copy}
        cta={cta}
        aside={aside}
        border={border}
      >
        {groups}
      </ContentBlock>
    </div>
  );
};

ContentBlockMixed.propTypes = {
  /**
   * Title of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Simple content item.
   * Uses [`markdownToHtml`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/utilities/src/utilities/markdownToHtml) utility.
   */
  copy: PropTypes.string,

  /**
   * The data of the content groups to render. See the following for full usage details:
   *
   * * [`<ContentGroupCards>`](http://www.ibm.com/standards/carbon/react/?path=/docs/patterns-blocks-contentgroupcards--default#props)
   * * [`<ContentGroupSimple>`](http://www.ibm.com/standards/carbon/react/?path=/docs/patterns-blocks-contentgroupsimple--default#props)
   * * [`<ContentGroupPictograms>`](http://www.ibm.com/standards/carbon/react/?path=/docs/patterns-blocks-contentgrouppictograms--default#props)
   */
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.oneOf([
          'ContentGroupCards',
          'ContentGroupSimple',
          'ContentGroupPictograms',
        ]).isRequired,
        heading: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            copy: PropTypes.string,
            cta: PropTypes.shape({
              href: PropTypes.string,
            }),
          })
        ),
      }),
      PropTypes.shape({
        type: PropTypes.oneOf([
          'ContentGroupCards',
          'ContentGroupSimple',
          'ContentGroupPictograms',
        ]).isRequired,
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
        ]),
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
              copy: PropTypes.string,
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
              PropTypes.oneOf([
                'jump',
                'local',
                'external',
                'download',
                'video',
              ])
            ),
          ]),
          copy: PropTypes.string,
          href: PropTypes.string,
          customClassName: PropTypes.string,
        }),
      }),
      PropTypes.shape({
        type: PropTypes.oneOf([
          'ContentGroupCards',
          'ContentGroupSimple',
          'ContentGroupPictograms',
        ]).isRequired,
        heading: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            heading: PropTypes.string.isRequired,
            copy: PropTypes.string.isRequired,
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
              copy: PropTypes.string,
              href: PropTypes.string,
              customClassName: PropTypes.string,
            }),
            pictogram: PropTypes.shape({
              src: PropTypes.object.isRequired,
            }),
            className: PropTypes.string,
          })
        ).isRequired,
        className: PropTypes.string,
      }),
    ])
  ).isRequired,

  /**
   * CTA used at the end of content body. `Card` style supported.
   * See the [`<CTA>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['card']),
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
      ),
    ]),
    copy: PropTypes.string,
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
  aside: PropTypes.shape({
    items: PropTypes.element,
    border: PropTypes.bool,
  }),

  /**
   * border for content block.
   */
  border: PropTypes.bool,
};

export default ContentBlockMixed;

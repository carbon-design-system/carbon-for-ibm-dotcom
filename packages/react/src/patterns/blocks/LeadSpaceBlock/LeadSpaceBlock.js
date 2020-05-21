import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import { LinkList } from '../../sub-patterns/LinkList';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders media either video or image content
 *
 * @param {string} type media type
 * @param {object} data media data
 * @returns {*} Image or Video
 */
const _renderMedia = (type, data) => {
  if (data) {
    return (
      <div
        data-autoid={`${stablePrefix}--leadspace-block__media`}
        className={`${prefix}--leadspace-block__media`}>
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

/**
 * renders Lead space block component (left-aligned)
 *
 * @param {object} props props object
 * @param {string} props.title heading of the page.
 * @param {string} props.heading sub-heading.
 * @param {string} props.copy lead space short copy to support the title.
 * @param {string} props.mediaType type of media.
 * @param {object} props.mediaData media object with media source.
 * @param {object} props.items contains data for link list item.
 * @param {object} props.cta contains button cta data.
 * @returns {*} Lead space block component
 */
const LeadSpaceBlock = ({
  title,
  heading,
  copy,
  mediaType,
  mediaData,
  items,
  cta,
}) => {
  const pageTitle = (
    <div>
      {title && (
        <h1
          data-autoid={`${stablePrefix}--leadspace-block__title`}
          className={`${prefix}--leadspace-block__title`}>
          {title}
        </h1>
      )}
    </div>
  );

  return (
    <div
      data-autoid={`${stablePrefix}--leadspace-block`}
      className={`${prefix}--leadspace-block`}>
      {pageTitle}
      <ContentBlock heading={heading} copy={copy}>
        {_renderMedia(mediaType, mediaData)}
        <LinkList
          style="vertical-end"
          heading={items.heading}
          items={items.items}
        />
        <CTA
          customClassName={`${prefix}--leadspace-block__cta ${prefix}--leadspace-block__cta-col`}
          {...cta}
        />
      </ContentBlock>
    </div>
  );
};

LeadSpaceBlock.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  copy: PropTypes.string,
  mediaType: PropTypes.oneOf('image', 'video'),
  mediaData: PropTypes.object,
  cta: PropTypes.shape(CTA.propTypes),
};

LeadSpaceBlock.defaultProps = {
  copy: '',
  mediaType: null,
  mediaData: null,
  cta: null,
};

export default LeadSpaceBlock;

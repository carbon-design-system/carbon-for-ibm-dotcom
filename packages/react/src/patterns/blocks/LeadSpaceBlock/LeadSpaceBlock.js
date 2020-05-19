import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import {VideoPlayer} from "../../../components/VideoPlayer";
import { LinkList } from '../../sub-patterns/LinkList';
import { Button} from 'carbon-components-react';
import { ContentBlock } from '../../sub-patterns/ContentBlock';
import {ImageWithCaption} from "../../../components/ImageWithCaption";
import { CTA } from '../../../components/CTA';


const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const _renderMedia = (type, data) => {
  if (data) {
    return (
      <div data-autoid={`${stablePrefix}--leadspace-block__media`}
           className={`${prefix}--leadspace-block__media`}>
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

/**
 * Lead space block component (left-aligned)
 *
 * @param {string} props.title lead space main-heading to support the title.
 * @param {string} props.heading lead space sub-heading to support the title.
 * @param {string} props.copy lead space short copy to support the description.
 * @param {string} props.mediaType media type.
 * @param {object} props.mediaData contains media source and description.
 * @param {object} props.items contains data for link list item.
 * @param {object} props.items contains button data.

 * @returns {*} Lead space block component
 */

const LeadSpaceBlock = ({copy, title, heading, mediaType, mediaData, items, button, cta }) => {

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
      <ContentBlock  heading={heading} copy={copy}>
        {_renderMedia(mediaType, mediaData)}
        <LinkList {...items}/>
        <CTA customClassName={`${prefix}--leadspace-block__cta ${prefix}--leadspace-block__cta-col`}
             {...cta}/>
      </ContentBlock>
    </div>
  );
};

LeadSpaceBlock.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  copy: PropTypes.string,
  mediaType: PropTypes.oneOf('image','video'),
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

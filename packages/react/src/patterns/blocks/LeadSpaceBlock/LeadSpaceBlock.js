import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import {VideoPlayer} from "../../../components/VideoPlayer";
import { LinkList } from '../../sub-patterns/LinkList';
import { Button} from 'carbon-components-react';
import { ContentBlock } from '../../sub-patterns/ContentBlock';
import {ImageWithCaption} from "../../../components/ImageWithCaption";


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

const LeadSpaceBlock = ({copy, title, heading, mediaType, mediaData, items, button }) => {

  const pageTitle = (
    <div>
      {title && (
        <h1
          data-autoid={`${stablePrefix}--lead-space-block__title`}
          className={`${prefix}--lead-space-block__title`}>
          {title}
        </h1>
      )}
    </div>
  );

  return (
    <div
      data-autoid={`${stablePrefix}--lead-space-block`}
      className={`${prefix}--lead-space-block`}>
      {pageTitle}
      <ContentBlock  heading={heading} copy={copy}>
        {_renderMedia(mediaType, mediaData)}
        <LinkList {...items}/>
        <Button {...button} >{button.copy}</Button>
      </ContentBlock>
    </div>
  );
};

LeadSpaceBlock.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string,
  heading: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
  button: PropTypes.string
};

export default LeadSpaceBlock;

import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import {VideoPlayer} from "../../../components/VideoPlayer";
import { LinkList } from '../../sub-patterns/LinkList';
import { Button} from 'carbon-components-react';
import { ContentBlock } from '../../sub-patterns/ContentBlock';
import {ImageWithCaption} from "../../../components/ImageWithCaption";
import Layout from "../../sub-patterns/Layout/Layout";


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
        <Button {...button} >{button.copy}</Button>
      </ContentBlock>
    </div>
  );
};

LeadSpaceBlock.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
};

LeadSpaceBlock.defaultProps = {
  copy: PropTypes.string,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
  button: PropTypes.object
};

export default LeadSpaceBlock;

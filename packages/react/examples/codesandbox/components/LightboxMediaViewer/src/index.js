/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import { ButtonGroup } from "@carbon/ibmdotcom-react/es/components/ButtonGroup";
import { LightboxMediaViewer } from "@carbon/ibmdotcom-react/es/components/LightboxMediaViewer";
import React, { useState } from "react";
import ReactDom from 'react-dom';

const App = () => {
  const image = {
    src: "https://fpoimg.com/1280x720?text=16:9&bg_color=ee5396&text_color=161616",
    alt: "Image alt text",
    title: "Curabitur malesuada varius mi eu posuere",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`,
    type: "image",
  };

  const video = {
    src: "1_9h94wo6b",
    type: "video",
  };

  const imageButton = [
    {
      copy: "Open image modal",
      href: "#",
      onClick: openImage,
    },
  ];

  const videoButton = [
    {
      copy: "Open video modal",
      href: "#",
      onClick: openVideo,
    },
  ];

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8">
          <h4>LightboxMediaViewer - Image</h4>
          <ButtonGroup buttons={imageButton} />
          {isImageOpen && (
            <LightboxMediaViewer open={isImageOpen} media={image} />
          )}
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8">
          <h4>LightboxMediaViewer - Embedded Video</h4>
          <ButtonGroup buttons={videoButton} />
          {isVideoOpen && (
            <LightboxMediaViewer open={isVideoOpen} media={video} />
          )}
        </div>
      </div>
    </div>
  );

  function openImage() {
    setIsImageOpen(true);
  }

  function openVideo() {
    setIsVideoOpen(true);
  }
};

ReactDom.render(<App />, document.getElementById('app'));

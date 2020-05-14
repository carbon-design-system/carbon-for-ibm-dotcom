import {
  object,
  select,
  withKnobs,
  text
} from '@storybook/addon-knobs';
import LeadSpaceBlock from '../LeadSpaceBlock.js';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';
import {HorizontalRule} from "../../../../components/HorizontalRule";

storiesOf('Patterns (Blocks)|LeadSpaceBlock', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {

    const title = 'Continuous delivery';

    const heading= text(
      'Heading (required)',
      'Innovate like a startup and scale for the enterprise '
    );

    const copy = `Automate your software release process with continuous delivery (CD)—the most 
    critical part of adopting DevOps. Build, test, and deploy code changes quickly, 
    ensuring software is always ready for deployment.`;

    const mediaType = select(
      'mediaType (optional)',
      ['image', 'video', 'none'],
      'image'
    );

    const video = {
      videoId: '0_uka1msg4',
      showCaption: true,
    };

    const image = {
      heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: {
        sources: [
          {
            src: 'https://dummyimage.com/320x180/ee5396/161616&text=16:9',
            breakpoint: 320,
          },
          {
            src: 'https://dummyimage.com/400x225/ee5396/161616&text=16:9',
            breakpoint: 400,
          },
          {
            src: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
            breakpoint: 672,
          },
        ],
        alt: 'Image alt text',
        defaultSrc: 'https://dummyimage.com/672x378/ee5396/161616&text=16:9',
      },
    };

    const mediaData = mediaType === 'image' ? image : video;

    const linkListProps = {
      heading: text('link list heading:', 'Featured products'),
      items: object('link list items array', [
        {
          type: 'local',
          copy: 'IBM Cloud Continuous Delivery',
          cta: {
            href: 'https://ibm.com',
          },
        },
        {
          type: 'local',
          copy: 'UrbanCode',
          cta: {
            href: 'https://ibm.com',
          },
        },
        {
          type: 'local',
          copy: 'View all products',
          cta: {
            href: 'https://ibm.com',
          },
        },
      ]),
    };


    const buttonprops = {
      copy: text(`Button`, `Contact Sales`),
      href: text('Primary button link', 'https://www.example.com'),
    };

    return (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8">
            <LeadSpaceBlock
              title={title}
              copy={copy}
              heading={heading}
              mediaType={mediaType}
              mediaData={mediaData}
              items={linkListProps}
              button={buttonprops}
            />
          </div>
        </div>
        <HorizontalRule />
      </div>
    );
  });


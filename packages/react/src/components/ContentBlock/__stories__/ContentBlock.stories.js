/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, optionsKnob } from '@storybook/addon-knobs';
import ContentBlock from '../ContentBlock';
import ContentGroupSimple from '../../ContentGroupSimple/ContentGroupSimple';
import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import { LinkList } from '../../LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

const linkListProps = {
  heading: 'Tutorials',
  items: [
    {
      type: 'local',
      copy: 'Learn more about Kubernetes',
      cta: {
        href: 'https://ibm.com',
      },
    },
    {
      type: 'local',
      copy: 'Containerization A Complete Guide',
      cta: {
        href: 'https://ibm.com',
      },
    },
  ],
  totalLinks: 2,
};

const props = () => {
  // TODO options isn't working
  const addChildren = optionsKnob(
    'Add children',
    {
      'Content group simple': 'Content group simple',
    },
    '',
    { display: 'multi-select' }
  );
  const children = addChildren.includes('Content group simple') ? (
    <ContentGroupSimple
      mediaType="image"
      mediaData={ContentGroupSimpleKnobs.mediaData.image}
      heading="Natural language processing (NLP)"
      items={ContentGroupSimpleKnobs.items}
      copy={ContentGroupSimpleKnobs.copy}
    />
  ) : (
    ''
  );
  const asideItems = {
    items: <LinkList style="card" {...linkListProps} />,
    border: false,
  };
  const showAside = boolean('Aside (aside)', false);
  const aside = showAside ? asideItems : {};
  const showCTA = boolean('CTA', true);
  const cta = showCTA
    ? {
        cta: {
          href: 'https://www.example.com',
        },
        style: 'card',
        type: 'local',
        heading: 'Learn more about natual language processing',
      }
    : {};
  return {
    heading: text(
      'Heading (heading)',
      'What is the latest news in artificial intelligence?'
    ),
    copy: text(
      'Copy (copy)',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at, molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ligula, vitae finibus ante aliquet a.'
    ),
    children,
    aside,
    cta,
    border: boolean('Border (border)', false),
  };
};

export default {
  title: 'Components/Content block',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlock {...props()} />
        </div>
      </div>
    </div>
  );
};

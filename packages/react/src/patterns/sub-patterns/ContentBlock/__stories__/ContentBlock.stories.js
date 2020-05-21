/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  select,
  withKnobs,
  text,
  object,
  boolean,
} from '@storybook/addon-knobs';
import ContentBlock from '../ContentBlock';
import cx from 'classnames';
import { LinkList } from '../../LinkList';
import React from 'react';
import readme from '../README.md';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

export default {
  title: 'Patterns (Sub-Patterns)|ContentBlock',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const blockProps = {
    heading: 'This is the Content Block heading',
    copy: `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`,
    content: `This is the Content Block children.`,
  };

  const ctaProps = {
    style: 'card',
    type: 'external',
    copy: 'Lorem ipsum dolor sit amet',
    cta: {
      href: 'https://www.example.com',
    },
  };

  const cta = {
    cta: ctaProps,
    none: null,
  };

  const inverse = boolean('inverse', false);

  return (
    <div
      className={cx('bx--grid', {
        [`${prefix}--content-block--inverse`]: inverse,
      })}>
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-sm-4 bx--offset-lg-4">
          <ContentBlock
            heading={blockProps.heading}
            copy={blockProps.copy}
            inverse={inverse}
            cta={select('CTA (optional)', cta, cta.cta)}
            customClassName={`${prefix}--content-block-story`}>
            {blockProps.content}
          </ContentBlock>
        </div>
      </div>
    </div>
  );
};

export const WithAsideElements = () => {
  const blockProps = {
    heading: 'This is the Content Block heading',
    copy: `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`,
    content: `This is the Content Block children.`,
  };

  const ctaProps = {
    style: 'card',
    type: 'external',
    copy: 'Lorem ipsum dolor sit amet',
    cta: {
      href: 'https://www.example.com',
    },
  };

  const cta = {
    cta: ctaProps,
    none: null,
  };

  const linkListProps = {
    heading: text('link list heading:', 'Tutorials'),
    items: object('link list items array', [
      {
        type: 'local',
        copy: 'Containerization A Complete Guide',
        cta: {
          href: 'https://ibm.com',
        },
      },
      {
        type: 'external',
        copy: 'Why should you use microservices and containers',
        cta: {
          href: 'https://ibm.com',
        },
      },
    ]),
  };

  const aside = {
    items: <LinkList style="card" {...linkListProps} />,
    border: boolean('border', false),
  };

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlock
            heading={blockProps.heading}
            copy={blockProps.copy}
            cta={select('CTA (optional)', cta, cta.cta)}
            aside={aside}
            customClassName={`${prefix}--content-block-story`}>
            {blockProps.content}
          </ContentBlock>
        </div>
      </div>
    </div>
  );
};

WithAsideElements.story = {
  name: 'With aside elements',
};

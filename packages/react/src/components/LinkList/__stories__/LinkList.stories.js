/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, object, select } from '@storybook/addon-knobs';
import LinkList from '../LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

const types = ['download', 'local', 'external', 'video'];
const headlines = [
  'Learn more',
  'Containerization A Complete Guide',
  'Microservices and containers',
];
const iconPlacement = ['left', 'right'];
const items = [
  {
    type: types[1],
    copy: headlines[0],
    cta: {
      href: 'https://ibm.com',
    },
  },
  {
    type: types[0],
    copy: headlines[1],
    cta: {
      href: 'https://ibm.com',
    },
  },
  {
    type: types[2],
    copy: headlines[2],
    cta: {
      href: 'https://ibm.com',
    },
  },
  {
    type: types[3],
    media: {
      src: '0_uka1msg4',
      type: 'video',
    },
  },
];

export default {
  title: 'Components|LinkList',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { heading, items } = parameters?.props?.LinkList ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-3 bx--offset-lg-4">
          <LinkList style="card" heading={heading} items={items} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      LinkList: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Tutorials', groupId),
        items: object('Items (items):', items, groupId),
      }),
    },
    propsSet: {
      default: {
        LinkList: {
          items,
        },
      },
    },
  },
};

export const Horizontal = ({ parameters }) => {
  const { heading, items, iconPlacement } = parameters?.props?.LinkList ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <LinkList
            style="horizontal"
            heading={heading}
            items={items}
            iconPlacement={iconPlacement}
          />
        </div>
      </div>
    </div>
  );
};

Horizontal.story = {
  parameters: {
    knobs: {
      LinkList: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Tutorials', groupId),
        items: object('Items (items):', items.slice(0, 2), groupId),
        iconPlacement: select(
          'Icon placement (iconPlacement):',
          iconPlacement,
          iconPlacement[1],
          groupId
        ),
      }),
    },
    propsSet: {
      default: {
        LinkList: {
          items: items.slice(0, 2),
        },
      },
    },
  },
};

export const Vertical = ({ parameters }) => {
  const { heading, items, iconPlacement } = parameters?.props?.LinkList ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <LinkList
            style="vertical"
            iconPlacement={iconPlacement}
            heading={heading}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};

Vertical.story = {
  parameters: {
    knobs: {
      LinkList: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Tutorials', groupId),
        items: object('Items (items):', items, groupId),
        iconPlacement: select(
          'Icon placement (iconPlacement):',
          iconPlacement,
          iconPlacement[0],
          groupId
        ),
      }),
    },
    propsSet: {
      default: {
        LinkList: {
          items,
        },
      },
    },
  },
};

export const VerticalWithCards = ({ parameters }) => {
  const { heading, items, iconPlacement } = parameters?.props?.LinkList ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <LinkList
            style="vertical"
            iconPlacement={iconPlacement}
            heading={heading}
            items={items}
          />
          <LinkList style="card" heading={heading} items={items} />
        </div>
      </div>
    </div>
  );
};

VerticalWithCards.story = {
  parameters: {
    knobs: {
      LinkList: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Tutorials', groupId),
        items: object('Items (items):', items, groupId),
        iconPlacement: select(
          'Icon placement (iconPlacement):',
          iconPlacement,
          iconPlacement[0],
          groupId
        ),
      }),
    },
    propsSet: {
      default: {
        LinkList: {
          items,
        },
      },
    },
  },
};

export const EndOfSection = ({ parameters }) => {
  const { heading, items } = parameters?.props?.LinkList ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <LinkList style="vertical-end" heading={heading} items={items} />
        </div>
      </div>
    </div>
  );
};

EndOfSection.story = {
  parameters: {
    knobs: {
      LinkList: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Tutorials', groupId),
        items: object('Items (items):', items, groupId),
      }),
    },
    propsSet: {
      default: {
        LinkList: {
          items,
        },
      },
    },
  },
};

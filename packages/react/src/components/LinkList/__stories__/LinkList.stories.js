/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, withKnobs } from '@storybook/addon-knobs';
import LinkList from '../LinkList';
import React from 'react';
import readme from '../README.stories.mdx';

const types = ['download', 'local', 'external', 'video'];
const headlines = [
  'Learn more about Kubernetes',
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
      href:
        'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
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
      src: '1_9h94wo6b',
      type: 'video',
    },
  },
];

const props = {
  default: () => ({
    heading: text('Heading (heading):', 'Tutorials'),
    items: items,
  }),
  horizontal: () => ({
    heading: text('Heading (heading):', 'Tutorials'),
    items: items.slice(0, 2),
    iconPlacement: select(
      'Icon placement (iconPlacement):',
      iconPlacement,
      iconPlacement[1]
    ),
  }),
  vertical: () => ({
    heading: text('Heading (heading):', 'Tutorials'),
    items: items.slice(0, 2),
    iconPlacement: select(
      'Icon placement (iconPlacement):',
      iconPlacement,
      iconPlacement[0]
    ),
  }),
  verticalWithCards: () => ({
    heading: text('Heading (heading):', 'Tutorials'),
    items: items,
    iconPlacement: select(
      'Icon placement (iconPlacement):',
      iconPlacement,
      iconPlacement[0]
    ),
  }),
};

export default {
  title: 'Components/Link list',
  component: LinkList,
  decorators: [withKnobs],
  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-3 bx--offset-lg-4">
          <LinkList style="card" {...props.default()} />
        </div>
      </div>
    </div>
  );
};

// Default.story = {
//   parameters: {
//     knobs: {
//       LinkList: () => ({
//         heading: text('Heading (heading):', 'Tutorials'),
//         items: items,
//       }),
//     },
//     propsSet: {
//       default: {
//         LinkList: {
//           items,
//         },
//       },
//     },
//   },
// };

export const Horizontal = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <LinkList style="horizontal" {...props.horizontal()} />
        </div>
      </div>
    </div>
  );
};

// Horizontal.story = {
//   parameters: {
//     knobs: {
//       LinkList: () => ({
//         heading: text('Heading (heading):', 'Tutorials'),
//         items: items.slice(0, 2),
//         iconPlacement: select(
//           'Icon placement (iconPlacement):',
//           iconPlacement,
//           iconPlacement[1]
//         ),
//       }),
//     },
//     propsSet: {
//       default: {
//         LinkList: {
//           items: items.slice(0, 2),
//         },
//       },
//     },
//   },
// };

export const Vertical = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <LinkList style="vertical" {...props.vertical()} />
        </div>
      </div>
    </div>
  );
};

// Vertical.story = {
//   parameters: {
//     knobs: {
//       LinkList: () => ({
//         heading: text('Heading (heading):', 'Tutorials'),
//         items: items,
//         iconPlacement: select(
//           'Icon placement (iconPlacement):',
//           iconPlacement,
//           iconPlacement[0]
//         ),
//       }),
//     },
//     propsSet: {
//       default: {
//         LinkList: {
//           items,
//         },
//       },
//     },
//   },
// };

export const VerticalWithCards = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <LinkList style="vertical" {...props.verticalWithCards()} />
          <LinkList style="card" {...props.default()} />
        </div>
      </div>
    </div>
  );
};

// VerticalWithCards.story = {
//   name: 'Vertical with cards',
//   parameters: {
//     knobs: {
//       LinkList: () => ({
//         heading: text('Heading (heading):', 'Tutorials'),
//         items: items,
//         iconPlacement: select(
//           'Icon placement (iconPlacement):',
//           iconPlacement,
//           iconPlacement[0]
//         ),
//       }),
//     },
//     propsSet: {
//       default: {
//         LinkList: {
//           items,
//         },
//       },
//     },
//   },
// };

export const EndOfSection = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <LinkList style="vertical-end" {...props.default()} />
        </div>
      </div>
    </div>
  );
};

// EndOfSection.story = {
//   name: 'End of section',
//   parameters: {
//     knobs: {
//       LinkList: () => ({
//         heading: text('Heading (heading):', 'Tutorials'),
//         items,
//       }),
//     },
//     propsSet: {
//       default: {
//         LinkList: {
//           items,
//         },
//       },
//     },
//   },
// };

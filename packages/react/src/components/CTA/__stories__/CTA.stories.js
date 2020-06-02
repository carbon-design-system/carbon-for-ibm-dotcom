/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import CTA from '../CTA';
import React from 'react';
import readme from '../README.stories.mdx';
import { select } from '@storybook/addon-knobs';

const styles = ['text', 'card', 'feature', 'button'];
const types = ['local', 'download', 'jump', 'external', 'video', 'default'];
const copy = ['Lorem ipsum dolor sit amet', 'Consectetur adipisicing elit'];

const urlBy = {
  download:
    'https://www.ibm.com/annualreport/assets/downloads/IBM_Annual_Report_2019.pdf',
  jump: '#example',
  local: 'https://www.example.com',
  external: 'https://www.example.com',
  default: 'https://www.example.com',
};

const miscCTAData = {
  text({ type }) {
    return {
      type: type,
      href: urlBy[type],
      copy: copy[0],
      media: {
        src: '0_uka1msg4',
        type: 'video',
      },
    };
  },
  card({ type }) {
    return {
      copy: copy[0],
      cta: {
        href: urlBy[type],
      },
      media: {
        src: '0_uka1msg4',
        type: 'video',
      },
    };
  },
  feature({ type }) {
    return {
      heading: copy[0],
      card: {
        type: type,
        heading: copy[1],
        cta: {
          href: urlBy[type],
          icon: {
            src: ArrowRight20,
          },
          media: {
            src: '0_uka1msg4',
            type: 'video',
          },
        },
        image: {
          defaultSrc: 'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
          alt: 'Image alt text',
        },
      },
    };
  },
  button({ type }) {
    return {
      buttons: [
        {
          type: type[0],
          href: urlBy[type[0]],
          copy: copy[0],
          media: {
            src: '0_uka1msg4',
            type: 'video',
          },
        },
        {
          type: type[1],
          href: urlBy[type[1]],
          copy: copy[1],
          media: {
            src: '1_sf5ovm7u',
            type: 'video',
          },
        },
      ],
    };
  },
};

export default {
  title: 'Components|CTA',

  parameters: {
    ...readme.parameters,
    knobs: {
      CTA: ({ groupId }) => {
        const style = select('style', styles, styles[0], groupId);
        const type =
          style !== 'button'
            ? select('type', types, types[0], groupId)
            : [
                select('button 1 type', types, types[0], groupId),
                select('button 2 type', types, types[0], groupId),
              ];
        return {
          style,
          type,
          ...miscCTAData[style]({ type }),
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { type, ...rest } = parameters?.props?.CTA ?? {};
  return (
    <div className="bx--grid ">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <CTA type={type} {...rest} />
        </div>
      </div>
      {type === 'jump' || type[0] === 'jump' || type[1] === 'jump' ? (
        <div
          className="bx--row"
          style={{ marginTop: '80px', marginBottom: '80px' }}>
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            {(() => {
              let content = [];
              for (let i = 0; i < 10; i++) {
                if (i === 4) {
                  content.push(
                    <h4 id="example" style={{ marginBottom: '32px' }}>
                      Example
                    </h4>
                  );
                }
                content.push(
                  <p style={{ marginBottom: '32px' }}>
                    {
                      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    }
                  </p>
                );
              }
              return content;
            })()}
          </div>
        </div>
      ) : null}
    </div>
  );
};

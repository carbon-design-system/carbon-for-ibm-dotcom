/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Default } from '../../src/components/CTA/__stories__/CTA.stories';
import React from 'react';
import ReactDOM from 'react-dom';

describe('a11y compliance check for CTA', function() {
  const container = document.getElementById('html-fragment-container');

  it('should have a11y-compliant text CTA', async function() {
    const props = {
      CTA: {
        style: 'text',
        type: 'external',
        href: 'https://www.example.com',
        copy: 'Lorem ipsum dolor sit amet',
        media: {
          src: '0_uka1msg4',
          type: 'video',
        },
      },
    };
    ReactDOM.render(<Default parameters={{ props }} />, container);
    await expectAsync(container).toBeACheckerCompliant();
  });

  it('should have a11y-compliant card CTA', async function() {
    const props = {
      CTA: {
        style: 'card',
        type: 'external',
        cta: {
          href: 'https://www.example.com',
        },
        copy: 'Lorem ipsum dolor sit amet',
        media: {
          src: '0_uka1msg4',
          type: 'video',
        },
      },
    };
    ReactDOM.render(<Default parameters={{ props }} />, container);
    await expectAsync(container).toBeACheckerCompliant();
  });

  it('should have a11y-compliant feature CTA', async function() {
    const props = {
      CTA: {
        style: 'feature',
        type: 'external',
        heading: 'Lorem ipsum dolor sit amet',
        card: {
          type: 'external',
          heading: 'Consectetur adipisicing elit',
          cta: {
            href: 'https://www.example.com',
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
      },
    };
    ReactDOM.render(<Default parameters={{ props }} />, container);
    await expectAsync(container).toBeACheckerCompliant();
  });

  it('should have a11y-compliant button CTA', async function() {
    const props = {
      CTA: {
        style: 'button',
        type: 'external',
        buttons: [
          {
            type: 'jump',
            href: '#example',
            copy: 'Lorem ipsum dolor sit amet',
            media: {
              src: '0_uka1msg4',
              type: 'video',
            },
          },
          {
            type: 'external',
            href: 'https://www.example.com',
            copy: 'Consectetur adipisicing elit',
            media: {
              src: '1_sf5ovm7u',
              type: 'video',
            },
          },
        ],
      },
    };
    ReactDOM.render(<Default parameters={{ props }} />, container);
    await expectAsync(container).toBeACheckerCompliant();
  });

  afterEach(function() {
    ReactDOM.render(undefined, container);
  });
});

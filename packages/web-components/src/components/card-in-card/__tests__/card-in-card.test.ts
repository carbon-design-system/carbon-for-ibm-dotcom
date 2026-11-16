/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { render } from 'lit/html.js';
import '../card-in-card';
import { Default } from '../__stories__/card-in-card.stories';

const template = (props?) =>
  Default({
    'c4d-card-in-card': props,
  });

describe('c4d-card-in-card', function () {
  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<c4d-card-in-card>`
      expect(document.body.querySelector('c4d-card-in-card')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          heading: 'Explore AI use cases in all industries',
          eyebrow: 'Explore AI use cases in all industries',
          defaultSrc:
            'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
          alt: 'Image alt text',
          href: 'https://example.com',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<c4d-card-in-card>`
      expect(document.body.querySelector('c4d-card-in-card')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
    describe('Video thumbnail fallback', function () {
      const renderVideoCard = async () => {
        render(
          html`<c4d-card-in-card
            href="0_ibuqxqbe"
            cta-type="video"></c4d-card-in-card>`,
          document.body
        );
        const card = document.body.querySelector('c4d-card-in-card') as any;
        await card.updateComplete;
        return card;
      };

      it('should use a Kaltura CDN thumbnail sized to the card when `videoThumbnailUrl` is empty', async function () {
        const card = await renderVideoCard();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const expectedWidth = Math.round(card.offsetWidth * pixelRatio);
        const image = card.shadowRoot.querySelector('c4d-card-in-card-image');
        expect(image.getAttribute('default-src')).toBe(
          `https://cdnsecakmi.kaltura.com/p/1773841/thumbnail/entry_id/0_ibuqxqbe/width/${expectedWidth}`
        );
      });

      it('should prefer the Mediacenter thumbnail when it is available', async function () {
        (window as any).IBM = {
          Mediacenter: {
            player: {
              api: {
                getThumbnail: () => 'https://example.com/thumbnail.jpg',
              },
            },
          },
        };
        try {
          const card = await renderVideoCard();
          card.requestUpdate();
          await card.updateComplete;
          const image = card.shadowRoot.querySelector('c4d-card-in-card-image');
          expect(image.getAttribute('default-src')).toBe(
            'https://example.com/thumbnail.jpg'
          );
        } finally {
          delete (window as any).IBM;
        }
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});

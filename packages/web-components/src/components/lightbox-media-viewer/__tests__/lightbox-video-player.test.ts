/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import '../lightbox-video-player';

const template = (props?) => {
  const { description, duration, formatCaption, hideCaption, name } = props ?? {};
  return html`
    <dds-lightbox-video-player
      description="${ifNonNull(description)}"
      duration="${ifNonNull(duration)}"
      ?hide-caption="${hideCaption}"
      name="${ifNonNull(name)}"
      .formatCaption="${ifNonNull(formatCaption)}"
    >
    </dds-lightbox-video-player>
  `;
};

describe('dds-lightbox-video-player', function() {
  it('should render with minimum attributes', async function() {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.querySelector('dds-lightbox-video-player')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('should render with various attributes', async function() {
    render(
      template({
        description: 'video-description-foo',
        duration: 30000,
        name: 'video-name-foo',
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-lightbox-video-player')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('should support hiding the caption', async function() {
    render(
      template({
        hideCaption: true,
      }),
      document.body
    );
    await Promise.resolve();
    const { shadowRoot } = document.querySelector('dds-lightbox-video-player')!;
    expect(shadowRoot!.querySelector('.bx--lightbox-media-viewer__content__title')).toBeNull();
    expect(shadowRoot!.querySelector('.bx--lightbox-media-viewer__content__desc')).toBeNull();
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});

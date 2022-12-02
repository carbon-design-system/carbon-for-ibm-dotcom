/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import '../lightbox-video-player';

const template = (props?) => {
  const {
    description,
    duration,
    formatCaption,
    formatDuration,
    hideCaption,
    name,
  } = props ?? {};
  return html`
    <dds-lightbox-video-player
      description="${ifNonNull(description)}"
      duration="${ifNonNull(duration)}"
      ?hide-caption="${hideCaption}"
      name="${ifNonNull(name)}"
      .formatCaption="${ifNonNull(formatCaption)}"
      .formatDuration="${ifNonNull(formatDuration)}">
    </dds-lightbox-video-player>
  `;
};

describe('dds-lightbox-video-player', function () {
  it('should render with minimum attributes', async function () {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.querySelector('dds-lightbox-video-player')).toMatchSnapshot(
      { mode: 'shadow' }
    );
  });

  it('should render with various attributes', async function () {
    render(
      template({
        description: 'video-description-foo',
        duration: 30,
        name: 'video-name-foo',
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-lightbox-video-player')).toMatchSnapshot(
      { mode: 'shadow' }
    );
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});

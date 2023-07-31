/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
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
      description="${ifDefined(description)}"
      duration="${ifDefined(duration)}"
      ?hide-caption="${hideCaption}"
      name="${ifDefined(name)}"
      .formatCaption="${ifDefined(formatCaption)}"
      .formatDuration="${ifDefined(formatDuration)}">
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

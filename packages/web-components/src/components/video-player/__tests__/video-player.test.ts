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
import '../video-player';

const template = (props?) => {
  const { duration, formatCaption, hideCaption, name } = props ?? {};
  return html`
    <dds-video-player
      duration="${ifNonNull(duration)}"
      ?hide-caption="${hideCaption}"
      name="${ifNonNull(name)}"
      .formatCaption="${ifNonNull(formatCaption)}"
    >
    </dds-video-player>
  `;
};

describe('dds-video-player', function() {
  it('should render with minimum attributes', async function() {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('should render with various attributes', async function() {
    render(
      template({
        duration: 30000,
        name: 'video-name-foo',
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')).toMatchSnapshot({ mode: 'shadow' });
  });

  it('should support hiding the caption', async function() {
    render(
      template({
        hideCaption: true,
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')!.shadowRoot!.querySelector('.bx--video-player__video-caption')).toBeNull();
  });

  it('should support zero-fill in formatting caption', async function() {
    render(
      template({
        duration: 65000,
        name: 'video-name-foo',
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')!.getAttribute('aria-label')).toBe('video-name-foo (1:05)');
  });

  it('should support custom duration formatter for localization', async function() {
    render(
      template({
        duration: 60000,
        name: 'video-name-foo',
        formatCaption({ duration, name }: { duration?: number; name: string }) {
          return `${name}-${duration}`;
        },
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-video-player')!.getAttribute('aria-label')).toBe('video-name-foo-60000');
  });

  afterEach(function() {
    render(undefined!, document.body);
  });
});

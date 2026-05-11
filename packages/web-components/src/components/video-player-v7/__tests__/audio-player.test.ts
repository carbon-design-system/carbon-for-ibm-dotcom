/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit';
import { html } from 'lit';
import '../video-player-container';

describe('c4d-video-player-container-v7 audio player', function () {
  let elem: HTMLElement;

  beforeEach(async function () {
    elem = document.createElement('c4d-video-player-container-v7');
    document.body.appendChild(elem);
  });

  afterEach(function () {
    elem?.remove();
  });

  it('should have default player type as VIDEO', async function () {
    const playerType = elem.getAttribute('player-type');
    expect(playerType).toBeNull(); // Default is VIDEO, not set as attribute
  });

  it('should accept AUDIO player type', async function () {
    elem.setAttribute('player-type', 'AUDIO');
    await elem.updateComplete;
    expect(elem.getAttribute('player-type')).toBe('AUDIO');
  });

  it('should accept custom ui-conf-id', async function () {
    elem.setAttribute('ui-conf-id', '57620223');
    await elem.updateComplete;
    expect(elem.getAttribute('ui-conf-id')).toBe('57620223');
  });

  it('should accept custom partner-id', async function () {
    elem.setAttribute('partner-id', '1511271');
    await elem.updateComplete;
    expect(elem.getAttribute('partner-id')).toBe('1511271');
  });

  it('should render audio player with all custom attributes', async function () {
    elem.setAttribute('video-id', '1_z7acjsm9');
    elem.setAttribute('player-type', 'AUDIO');
    elem.setAttribute('ui-conf-id', '57620223');
    elem.setAttribute('partner-id', '1511271');
    elem.setAttribute('caption', 'Test Podcast');
    await elem.updateComplete;

    expect(elem.getAttribute('video-id')).toBe('1_z7acjsm9');
    expect(elem.getAttribute('player-type')).toBe('AUDIO');
    expect(elem.getAttribute('ui-conf-id')).toBe('57620223');
    expect(elem.getAttribute('partner-id')).toBe('1511271');
    expect(elem.getAttribute('caption')).toBe('Test Podcast');
  });
});

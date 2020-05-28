/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AnalyticsAPI from '../Analytics';
import root from 'window-or-global';

describe('AnalyticsAPI', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, { SCROLL_TRACKING: true });
  });

  it('should execute the methods in the initAll call', () => {
    const initScrollTracker = jest.spyOn(AnalyticsAPI, 'initScrollTracker');
    const initDynamicTabs = jest.spyOn(AnalyticsAPI, 'initDynamicTabs');
    const initModals = jest.spyOn(AnalyticsAPI, 'initModals');

    AnalyticsAPI.initAll();

    expect(initScrollTracker).toHaveBeenCalled();
    expect(initDynamicTabs).toHaveBeenCalled();
    expect(initModals).toHaveBeenCalled();

    initScrollTracker.mockRestore();
    initDynamicTabs.mockRestore();
    initModals.mockRestore();
  });

  it('should execute the triggerTabSelected analytics call', () => {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    AnalyticsAPI.triggerTabSelected('path', 'title');

    expect(registerEvent).toHaveBeenCalled();

    registerEvent.mockRestore();
  });

  it('should execute the triggerModalHide analytics call', () => {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    AnalyticsAPI.triggerModalHide('path', 'title');

    expect(registerEvent).toHaveBeenCalled();

    registerEvent.mockRestore();
  });

  it('should execute the triggerModalHide analytics call', () => {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    AnalyticsAPI.triggerModalHide('path', 'title');

    expect(registerEvent).toHaveBeenCalled();

    registerEvent.mockRestore();
  });

  it('should execute the initModals analytics call', () => {
    root.document.addEventListener = jest.fn();
    AnalyticsAPI.initModals();
    expect(root.document.addEventListener).toHaveBeenCalledTimes(2);
  });

  it('should execute the initDynamicTabs analytics call', () => {
    root.document.addEventListener = jest.fn();
    AnalyticsAPI.initDynamicTabs();
    expect(root.document.addEventListener).toHaveBeenCalledTimes(1);
  });

  it('should execute the videoPlayerStatics analytics call', () => {
    const data = {
      playerType: 'kaltura',
      title: 'Folgers Coffee',
      currentTime: 1,
      duration: 60,
      playerState: 1,
      videoId: '0_uka1msg4',
    };
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    AnalyticsAPI.videoPlayerStats(data);
    expect(registerEvent).toHaveBeenCalled();

    registerEvent.mockRestore();
  });
});

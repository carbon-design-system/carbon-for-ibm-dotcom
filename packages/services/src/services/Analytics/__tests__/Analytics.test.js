/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AnalyticsAPI from '../Analytics';
import root from 'window-or-global';

describe('AnalyticsAPI', function() {
  it('should execute the methods in the initAll call', function() {
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

  it('registerEvent should fire event', function() {
    root.ibmStats = {
      event: jest.fn(),
    };

    AnalyticsAPI.registerEvent('testData');

    expect(root.ibmStats.event).toHaveBeenCalledTimes(1);
    expect(root.ibmStats.event).toHaveBeenCalledWith('testData');
  });

  it('should execute the triggerTabSelected analytics call', function() {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    AnalyticsAPI.triggerTabSelected('path', 'title');

    expect(registerEvent).toHaveBeenCalled();

    registerEvent.mockRestore();
  });

  it('should handle error on triggerTabSelected analytics call', function() {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    registerEvent.mockImplementation(() => {
      throw new Error();
    });
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    AnalyticsAPI.triggerTabSelected('path', 'title');

    expect(registerEvent).toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledTimes(1);

    registerEvent.mockRestore();
    consoleError.mockRestore();
  });

  it('should execute the triggerModalHide analytics call', function() {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    AnalyticsAPI.triggerModalHide('path', 'title');

    expect(registerEvent).toHaveBeenCalled();

    registerEvent.mockRestore();
  });

  it('should handle error on triggerModalHide analytics call', function() {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    registerEvent.mockImplementation(() => {
      throw new Error();
    });
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    AnalyticsAPI.triggerModalHide('path', 'title');

    expect(registerEvent).toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledTimes(1);

    registerEvent.mockRestore();
    consoleError.mockRestore();
  });

  it('should execute the triggerModalShow analytics call', function() {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    AnalyticsAPI.triggerModalShow('path', 'title');

    expect(registerEvent).toHaveBeenCalled();

    registerEvent.mockRestore();
  });

  it('should handle error on triggerModalShow analytics call', function() {
    const registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    registerEvent.mockImplementation(() => {
      throw new Error();
    });
    const consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    AnalyticsAPI.triggerModalShow('path', 'title');

    expect(registerEvent).toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledTimes(1);

    registerEvent.mockRestore();
    consoleError.mockRestore();
  });

  it('should execute the initModals analytics call', function() {
    root.document.addEventListener = jest.fn();
    AnalyticsAPI.initModals();
    expect(root.document.addEventListener).toHaveBeenCalledTimes(2);
  });

  it('should execute the initModals analytics modal-hidden callback', function() {
    root.document.addEventListener = jest.fn();
    const triggerModalHide = jest.spyOn(AnalyticsAPI, 'triggerModalHide');
    AnalyticsAPI.initModals();

    const callback = root.document.addEventListener.mock.calls[0][1];
    callback({
      target: {
        id: 'testId',
      },
      detail: {
        launchingElement: {
          innerText: 'testText',
        },
      },
    });

    expect(triggerModalHide).toHaveBeenCalledTimes(1);
    expect(triggerModalHide).toHaveBeenCalledWith('testId', 'testText');
  });

  it('should execute the initModals analytics modal-show callback', function() {
    root.document.addEventListener = jest.fn();
    const triggerModalShow = jest.spyOn(AnalyticsAPI, 'triggerModalShow');
    AnalyticsAPI.initModals();

    const callback = root.document.addEventListener.mock.calls[1][1];
    callback({
      target: {
        id: 'testId',
      },
      detail: {
        launchingElement: {
          innerText: 'testText',
        },
      },
    });

    expect(triggerModalShow).toHaveBeenCalledTimes(1);
    expect(triggerModalShow).toHaveBeenCalledWith('testId', 'testText');
  });

  it('should execute the initDynamicTabs analytics call', function() {
    root.document.addEventListener = jest.fn();
    AnalyticsAPI.initDynamicTabs();
    expect(root.document.addEventListener).toHaveBeenCalledTimes(1);
  });

  it('should execute the initDynamicTabs analytics tab-selected callback', function() {
    root.document.addEventListener = jest.fn();
    const triggerTabSelected = jest.spyOn(AnalyticsAPI, 'triggerTabSelected');
    AnalyticsAPI.initDynamicTabs();

    const callback = root.document.addEventListener.mock.calls[0][1];
    callback({
      target: {
        id: 'testId',
      },
      detail: {
        item: {
          innerText: 'testText',
        },
      },
    });

    expect(triggerTabSelected).toHaveBeenCalledTimes(1);
    expect(triggerTabSelected).toHaveBeenCalledWith('testId', 'testText');
  });

  describe('videoPlayerStats', function() {
    beforeEach(function() {
      this.testData = {
        playerType: 'kaltura',
        title: 'Folgers Coffee',
        currentTime: 1,
        duration: 60,
        playerState: 0,
        videoId: '1_9h94wo6b',
      };

      this.registerEvent = jest.spyOn(AnalyticsAPI, 'registerEvent');
    });

    afterEach(function() {
      this.registerEvent.mockRestore();
    });

    it('should set launched state', function() {
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].execPathReturnCode).toEqual(
        'launched'
      );
    });

    it('should set paused state', function() {
      this.testData.playerState = 1;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].execPathReturnCode).toEqual(
        'paused'
      );
    });

    it('should set played state', function() {
      this.testData.playerState = 2;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].execPathReturnCode).toEqual(
        'played'
      );
    });

    it('should set ended state', function() {
      this.testData.playerState = 3;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].execPathReturnCode).toEqual(
        'ended'
      );
    });

    it('should set error state', function() {
      this.testData.playerState = 99;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].execPathReturnCode).toEqual(
        'error'
      );
    });

    it('should set cta-clicks', function() {
      this.testData.playerState = 101;
      this.testData.mediaId = this.testData.videoId;
      this.testData.customMetricsData = {
        playerStateLabel: 'cta-clk',
        driverId: this.testData.videoId,
        targetURL: 'https://www.ibm.com/test/',
      };
      delete this.testData.videoId;

      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].execPathReturnCode).toEqual(
        ''
      );
      expect(this.registerEvent.mock.calls[0][0].playerStateLabel).toEqual(
        'cta-clk'
      );
      expect(this.registerEvent.mock.calls[0][0].driverId).toEqual(
        this.testData.mediaId
      );
      expect(this.registerEvent.mock.calls[0][0].targetURL).toEqual(
        'https://www.ibm.com/test/'
      );
    });

    it('should set empty state', function() {
      this.testData.playerState = 4;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].execPathReturnCode).toEqual(
        ''
      );
    });

    it('should set current start time', function() {
      this.testData.currentTime = 0;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].eventVidTimeStamp).toEqual(
        'start'
      );
      expect(this.registerEvent.mock.calls[0][0].eventVidPlayed).toEqual('0%');
    });

    it('should set current end time when over duration', function() {
      this.testData.currentTime = 61;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].eventVidTimeStamp).toEqual(
        'end'
      );
      expect(this.registerEvent.mock.calls[0][0].eventVidPlayed).toEqual(
        '100%'
      );
    });

    it('should set current end time when ended', function() {
      this.testData.playerState = 3;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(this.registerEvent.mock.calls[0][0].eventVidTimeStamp).toEqual(
        'end'
      );
      expect(this.registerEvent.mock.calls[0][0].eventVidPlayed).toEqual(
        '100%'
      );
    });

    it('should return early when paused at the end', function() {
      this.testData.currentTime = 61;
      this.testData.playerState = 1;
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(0);
    });

    it('should handle error', function() {
      this.registerEvent.mockImplementation(() => {
        throw new Error();
      });
      const consoleError = jest.spyOn(console, 'error');
      consoleError.mockImplementation(() => {});
      AnalyticsAPI.videoPlayerStats(this.testData);

      expect(this.registerEvent).toHaveBeenCalledTimes(1);
      expect(consoleError).toHaveBeenCalledTimes(1);

      consoleError.mockRestore();
    });
  });
});

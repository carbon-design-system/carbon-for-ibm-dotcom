/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { formatVideoCaption, formatVideoDuration } from '../';

describe('g11n formatter for video caption', () => {
  describe('Formatting caption', () => {
    it('should support empty caption', async () => {
      expect(formatVideoCaption()).toBe('');
    });

    it('should support name-only caption', async () => {
      expect(formatVideoCaption({ name: 'foo' })).toBe('foo');
    });

    it('should support duration-only caption', async () => {
      expect(formatVideoCaption({ duration: '1:30' })).toBe('1:30');
    });

    it('should support a caption with the name and the duration', async () => {
      expect(formatVideoCaption({ name: 'foo', duration: '1:30' })).toBe(
        'foo (1:30)'
      );
    });

    it('should support a caption zero duration', async () => {
      expect(formatVideoCaption({ name: 'foo', duration: 0 })).toBe('foo (0)');
    });
  });

  describe('Formatting duration', () => {
    it('should support undefined duration', async () => {
      expect(formatVideoDuration()).toBeUndefined();
    });

    it('should support null duration', async () => {
      expect(formatVideoDuration({ duration: null })).toBeNull();
    });

    it('should fill zero for minutes', async () => {
      expect(formatVideoDuration({ duration: 30000 })).toBe('0:30');
    });

    it('should fill zero for seconds', async () => {
      expect(formatVideoDuration({ duration: 65000 })).toBe('1:05');
    });

    it('should support more than 1 minute', async () => {
      expect(formatVideoDuration({ duration: 90000 })).toBe('1:30');
    });
  });
});

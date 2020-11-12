/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../leadspace';
import {
  DefaultWithNoImage,
  DefaultWithImage,
  Centered,
  CenteredWithImage,
  Small,
  SmallWithImage,
} from '../__stories__/leadspace.stories';

const DefaultWithNoImageTemplate = (props?) =>
  DefaultWithNoImage({
    parameters: {
      props: {
        LeadSpace: {
          ...props,
          buttons: [
            {
              href: 'https://example.com',
              copy: 'button 1',
            },
            {
              href: 'https://example.com',
              copy: 'button 2',
            },
          ],
        },
      },
    },
  });

const DefaultWithImageTemplate = (props?) =>
  DefaultWithImage({
    parameters: {
      props: {
        LeadSpace: {
          ...props,
          buttons: [
            {
              href: 'https://example.com',
              copy: 'button 1',
            },
            {
              href: 'https://example.com',
              copy: 'button 2',
            },
          ],
        },
      },
    },
  });

const CenteredTemplate = (props?) =>
  Centered({
    parameters: {
      props: {
        LeadSpace: {
          ...props,
          buttons: [
            {
              href: 'https://example.com',
              copy: 'button 1',
            },
            {
              href: 'https://example.com',
              copy: 'button 2',
            },
          ],
        },
      },
    },
  });

const CenteredWithImageTemplate = (props?) =>
  CenteredWithImage({
    parameters: {
      props: {
        LeadSpace: {
          ...props,
          buttons: [
            {
              href: 'https://example.com',
              copy: 'button 1',
            },
            {
              href: 'https://example.com',
              copy: 'button 2',
            },
          ],
        },
      },
    },
  });

const SmallTemplate = (props?) =>
  Small({
    parameters: {
      props: {
        LeadSpace: {
          ...props,
          buttons: [
            {
              href: 'https://example.com',
              copy: 'button 1',
            },
            {
              href: 'https://example.com',
              copy: 'button 2',
            },
          ],
        },
      },
    },
  });

const SmallWithImageTemplate = (props?) =>
  SmallWithImage({
    parameters: {
      props: {
        LeadSpace: {
          ...props,
          buttons: [
            {
              href: 'https://example.com',
              copy: 'button 1',
            },
            {
              href: 'https://example.com',
              copy: 'button 2',
            },
          ],
        },
      },
    },
  });

describe('dds-leadspace', function() {
  describe('Misc attributes - DefaultWithNoImage', function() {
    it('should render with minimum attributes', async function() {
      render(DefaultWithNoImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        DefaultWithNoImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - DefaultWithImage', function() {
    it('should render with minimum attributes', async function() {
      render(DefaultWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        DefaultWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc: 'http://fpoimg.com/1056x480?bg_color=ee5396&amp;text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - Centered', function() {
    it('should render with minimum attributes', async function() {
      render(CenteredTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        CenteredTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - CenteredWithImage', function() {
    it('should render with minimum attributes', async function() {
      render(CenteredWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        CenteredWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc: 'http://fpoimg.com/1056x480?bg_color=ee5396&amp;text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - CenteredWithImage', function() {
    it('should render with minimum attributes', async function() {
      render(CenteredWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        CenteredWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc: 'http://fpoimg.com/1056x480?bg_color=ee5396&amp;text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - Small', function() {
    it('should render with minimum attributes', async function() {
      render(SmallTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        SmallTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - SmallWithImage', function() {
    it('should render with minimum attributes', async function() {
      render(SmallWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        SmallWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc: 'http://fpoimg.com/1056x480?bg_color=ee5396&amp;text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});

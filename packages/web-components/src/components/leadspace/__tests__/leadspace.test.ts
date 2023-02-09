/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import '../leadspace';
import {
  Tall,
  TallWithImage,
  Centered,
  CenteredWithImage,
  Medium,
  MediumWithImage,
} from '../__stories__/leadspace.stories';

const TallTemplate = (props?) =>
  Tall({
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
  });

const TallWithImageTemplate = (props?) =>
  TallWithImage({
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
  });

const CenteredTemplate = (props?) =>
  Centered({
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
  });

const CenteredWithImageTemplate = (props?) =>
  CenteredWithImage({
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
  });

const MediumTemplate = (props?) =>
  Medium({
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
  });

const MediumWithImageTemplate = (props?) =>
  MediumWithImage({
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
  });

describe('dds-leadspace', function () {
  describe('Misc attributes - TallWithNoImage', function () {
    it('should render with minimum attributes', async function () {
      render(TallTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        TallTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Misc attributes - TallWithImage', function () {
    it('should render with minimum attributes', async function () {
      render(TallWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        TallWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc:
            'http://fpoimg.com/1056x480?bg_color=ee5396&text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Misc attributes - Centered', function () {
    it('should render with minimum attributes', async function () {
      render(CenteredTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        CenteredTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Misc attributes - CenteredWithImage', function () {
    it('should render with minimum attributes', async function () {
      render(CenteredWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        CenteredWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc:
            'http://fpoimg.com/1056x480?bg_color=ee5396&text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Misc attributes - CenteredWithImage', function () {
    it('should render with minimum attributes', async function () {
      render(CenteredWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        CenteredWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc:
            'http://fpoimg.com/1056x480?bg_color=ee5396&text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Misc attributes - Medium', function () {
    it('should render with minimum attributes', async function () {
      render(MediumTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        MediumTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  describe('Misc attributes - MediumWithImage', function () {
    it('should render with minimum attributes', async function () {
      render(MediumWithImageTemplate(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });

    it('should render with various attributes', async function () {
      render(
        MediumWithImageTemplate({
          title: 'Lead space title',
          copy: 'Use this area for a short line of copy to support the title',
          gradient: true,
          alt: 'alt text',
          defaultSrc:
            'http://fpoimg.com/1056x480?bg_color=ee5396&text_color=161616',
        }),
        document.body
      );
      await Promise.resolve(); // Update cycle for `<dds-leadspace>`
      expect(document.body.querySelector('dds-leadspace')).toMatchSnapshot({
        mode: 'shadow',
      });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});

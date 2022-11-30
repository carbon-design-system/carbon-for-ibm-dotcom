/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../../content-item/content-item-heading';
import '../../link-list/link-list';
import '../../cta/link-list-item-cta';
import '../content-item-horizontal';
import '../content-item-horizontal-copy';
import '../content-item-horizontal-eyebrow';
import '../content-item-horizontal-thumbnail-copy';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import { CTA_TYPE } from '../../cta/defs';

const DefaultTemplate = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-item-horizontal> ${children} </dds-content-item-horizontal>
  `;
};

const WithMediaTemplate = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-item-horizontal-media>
      ${children}
    </dds-content-item-horizontal-media>
  `;
};

const WithFeaturedMediaTemplate = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-item-horizontal-media-featured>
      ${children}
    </dds-content-item-horizontal-media-featured>
  `;
};

const WithThumbnailTemplate = (props?) => {
  const { children } = props ?? {};
  return html`
    <dds-content-item-horizontal thumbnail>
      ${children}
    </dds-content-item-horizontal>
  `;
};

describe('dds-content-item-horizontal', function () {
  describe('Misc attributes - Default', function () {
    it('should render with minimum attributes', async function () {
      render(DefaultTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        DefaultTemplate({
          copy: 'copy-foo',
          children: html`
            <dds-content-item-horizontal-eyebrow
              >eyebrow-foo</dds-content-item-horizontal-eyebrow
            >
            <dds-content-item-heading>heading-foo</dds-content-item-heading>
            <dds-content-item-horizontal-copy
              >copy-foo</dds-content-item-horizontal-copy
            >
            <dds-link-list slot="footer" type="vertical">
              <dds-link-list-item-cta
                icon-placement="${ICON_PLACEMENT.RIGHT}"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.LOCAL}"
              >
                cta-copy-foo
              </dds-link-list-item-cta>
              <dds-link-list-item-cta
                icon-placement="${ICON_PLACEMENT.RIGHT}"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.EXTERNAL}"
              >
                cta-copy-foo
              </dds-link-list-item-cta>
            </dds-link-list>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - WithMedia', function () {
    it('should render with minimum attributes', async function () {
      render(WithMediaTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-item-horizontal-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        WithMediaTemplate({
          children: html`
            <dds-image slot="media" alt="image" default-src=""></dds-image>
            <dds-content-item-heading>heading-foo</dds-content-item-heading>
            <dds-content-item-horizontal-media-copy
              >copy-foo</dds-content-item-horizontal-media-copy
            >
            <dds-link-list slot="footer" type="vertical">
              <dds-link-list-item-cta
                icon-placement="right"
                href="www.ibm.com"
                cta-type="local"
              >
                cta-copy
              </dds-link-list-item-cta>
            </dds-link-list>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-item-horizontal-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - WithFeaturedMedia', function () {
    it('should render with minimum attributes', async function () {
      render(WithFeaturedMediaTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector(
          'dds-content-item-horizontal-media-featured'
        )
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        WithFeaturedMediaTemplate({
          children: html`
            <dds-content-item-horizontal-eyebrow
              >eyebrow-foo</dds-content-item-horizontal-eyebrow
            >
            <dds-content-item-heading>heading-foo</dds-content-item-heading>
            <dds-content-item-horizontal-media-copy
              >copy-foo</dds-content-item-horizontal-media-copy
            >
            <dds-link-list slot="footer" type="vertical">
              <dds-link-list-item-cta
                icon-placement="right"
                href="www.ibm.com"
                cta-type="local"
              >
                cta-copy
              </dds-link-list-item-cta>
            </dds-link-list>
            <dds-image slot="media" alt="image" default-src=""></dds-image>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector(
          'dds-content-item-horizontal-media-featured'
        )
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - WithThumbnail', function () {
    it('should render with minimum attributes', async function () {
      render(WithThumbnailTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        WithThumbnailTemplate({
          children: html`
            <dds-content-item-heading>heading-foo</dds-content-item-heading>
            <dds-content-item-horizontal-thumbnail-copy
              >copy-foo</dds-content-item-horizontal-thumbnail-copy
            >
            <dds-link-list slot="footer" type="vertical">
              <dds-link-list-item-cta
                icon-placement="${ICON_PLACEMENT.RIGHT}"
                href="www.ibm.com"
                cta-type="local"
              >
                cta-copy
              </dds-link-list-item-cta>
            </dds-link-list>
            <dds-image
              slot="thumbnail"
              alt="thumbnail-image"
              default-src=""
            ></dds-image>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('dds-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});

/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
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
    <c4d-content-item-horizontal> ${children} </c4d-content-item-horizontal>
  `;
};

const WithMediaTemplate = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-item-horizontal-media>
      ${children}
    </c4d-content-item-horizontal-media>
  `;
};

const WithFeaturedMediaTemplate = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-item-horizontal-media-featured>
      ${children}
    </c4d-content-item-horizontal-media-featured>
  `;
};

const WithThumbnailTemplate = (props?) => {
  const { children } = props ?? {};
  return html`
    <c4d-content-item-horizontal thumbnail>
      ${children}
    </c4d-content-item-horizontal>
  `;
};

describe('c4d-content-item-horizontal', function () {
  describe('Misc attributes - Default', function () {
    it('should render with minimum attributes', async function () {
      render(DefaultTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        DefaultTemplate({
          copy: 'copy-foo',
          children: html`
            <c4d-content-item-horizontal-eyebrow
              >eyebrow-foo</c4d-content-item-horizontal-eyebrow
            >
            <c4d-content-item-heading>heading-foo</c4d-content-item-heading>
            <c4d-content-item-horizontal-copy
              >copy-foo</c4d-content-item-horizontal-copy
            >
            <c4d-link-list slot="footer" type="vertical">
              <c4d-link-list-item-cta
                icon-placement="${ICON_PLACEMENT.RIGHT}"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.LOCAL}">
                cta-copy-foo
              </c4d-link-list-item-cta>
              <c4d-link-list-item-cta
                icon-placement="${ICON_PLACEMENT.RIGHT}"
                href="https://www.ibm.com"
                cta-type="${CTA_TYPE.EXTERNAL}">
                cta-copy-foo
              </c4d-link-list-item-cta>
            </c4d-link-list>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - WithMedia', function () {
    it('should render with minimum attributes', async function () {
      render(WithMediaTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-item-horizontal-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        WithMediaTemplate({
          children: html`
            <c4d-image slot="media" alt="image" default-src=""></c4d-image>
            <c4d-content-item-heading>heading-foo</c4d-content-item-heading>
            <c4d-content-item-horizontal-media-copy
              >copy-foo</c4d-content-item-horizontal-media-copy
            >
            <c4d-link-list slot="footer" type="vertical">
              <c4d-link-list-item-cta
                icon-placement="right"
                href="www.ibm.com"
                cta-type="local">
                cta-copy
              </c4d-link-list-item-cta>
            </c4d-link-list>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-item-horizontal-media')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - WithFeaturedMedia', function () {
    it('should render with minimum attributes', async function () {
      render(WithFeaturedMediaTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector(
          'c4d-content-item-horizontal-media-featured'
        )
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        WithFeaturedMediaTemplate({
          children: html`
            <c4d-content-item-horizontal-eyebrow
              >eyebrow-foo</c4d-content-item-horizontal-eyebrow
            >
            <c4d-content-item-heading>heading-foo</c4d-content-item-heading>
            <c4d-content-item-horizontal-media-copy
              >copy-foo</c4d-content-item-horizontal-media-copy
            >
            <c4d-link-list slot="footer" type="vertical">
              <c4d-link-list-item-cta
                icon-placement="right"
                href="www.ibm.com"
                cta-type="local">
                cta-copy
              </c4d-link-list-item-cta>
            </c4d-link-list>
            <c4d-image slot="media" alt="image" default-src=""></c4d-image>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector(
          'c4d-content-item-horizontal-media-featured'
        )
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc attributes - WithThumbnail', function () {
    it('should render with minimum attributes', async function () {
      render(WithThumbnailTemplate(), document.body);
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        WithThumbnailTemplate({
          children: html`
            <c4d-content-item-heading>heading-foo</c4d-content-item-heading>
            <c4d-content-item-horizontal-thumbnail-copy
              >copy-foo</c4d-content-item-horizontal-thumbnail-copy
            >
            <c4d-link-list slot="footer" type="vertical">
              <c4d-link-list-item-cta
                icon-placement="${ICON_PLACEMENT.RIGHT}"
                href="www.ibm.com"
                cta-type="local">
                cta-copy
              </c4d-link-list-item-cta>
            </c4d-link-list>
            <c4d-image
              slot="thumbnail"
              alt="thumbnail-image"
              default-src=""></c4d-image>
          `,
        }),
        document.body
      );
      await Promise.resolve();
      expect(
        document.body.querySelector('c4d-content-item-horizontal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});

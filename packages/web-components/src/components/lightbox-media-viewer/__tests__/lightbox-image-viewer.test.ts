/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import '../lightbox-image-viewer';

const template = (props?) => {
  const { alt, defaultSrc, description, title } = props ?? {};
  return html`
    <dds-lightbox-image-viewer
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      description="${ifNonNull(description)}"
      title="${ifNonNull(title)}">
    </dds-lightbox-image-viewer>
  `;
};

describe('dds-lightbox-image-viewer', function () {
  it('should render with minimum attributes', async function () {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.querySelector('dds-lightbox-image-viewer')).toMatchSnapshot(
      { mode: 'shadow' }
    );
  });

  it('should render with various attributes', async function () {
    render(
      template({
        alt: 'image-alt-foo',
        defaultSrc: 'https://example.com/image',
        description: 'image-description-foo',
        title: 'image-title-foo',
      }),
      document.body
    );
    await Promise.resolve();
    expect(document.querySelector('dds-lightbox-image-viewer')).toMatchSnapshot(
      { mode: 'shadow' }
    );
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});

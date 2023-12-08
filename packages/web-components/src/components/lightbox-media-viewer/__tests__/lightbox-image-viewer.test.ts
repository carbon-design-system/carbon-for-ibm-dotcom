/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../lightbox-image-viewer';

const template = (props?) => {
  const { alt, defaultSrc, description, title } = props ?? {};
  return html`
    <c4d-lightbox-image-viewer
      alt="${ifDefined(alt)}"
      default-src="${ifDefined(defaultSrc)}"
      description="${ifDefined(description)}"
      title="${ifDefined(title)}">
    </c4d-lightbox-image-viewer>
  `;
};

describe('c4d-lightbox-image-viewer', function () {
  it('should render with minimum attributes', async function () {
    render(template(), document.body);
    await Promise.resolve();
    expect(document.querySelector('c4d-lightbox-image-viewer')).toMatchSnapshot(
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
    expect(document.querySelector('c4d-lightbox-image-viewer')).toMatchSnapshot(
      { mode: 'shadow' }
    );
  });

  afterEach(function () {
    render(undefined!, document.body);
  });
});

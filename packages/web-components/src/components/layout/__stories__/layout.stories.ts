/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import styles from '../../../../../styles/scss/components/layout/_layout.scss';
import list from '../../../../../styles/scss/components/list/_list.scss';
import readme from './README.stories.mdx';

export const Default = () => {
  return html`
    <div
      style="width:100%"
      class="cds-grid cds--layout--top-layout-0 cds--layout--bottom-layout-06">
      <div
        class="cds-row cds--layout--top-layout-0 cds--layout--bottom-layout-06">
        <div class="cds-col-lg-12">
          <div>
            <div class="cds-row">
              <div class="cds-layout-2-3">
                <h3>Column 2-3</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ac turpis egestas maecenas pharetra convallis posuere.
                  Ultrices dui sapien eget mi proin sed libero enim. Elementum
                  facilisis leo vel fringilla. Sed tempus urna et pharetra
                  pharetra massa massa ultricies ridiculus mus mauris vitae
                  ultricies leo integer. Eget mauris pharetra et ultrices. Urna
                  neque viverra justo nec ultrices dui sapien. Augue eget arcu
                  dictum varius duis. Eget mauris pharetra et ultrices neque
                  ornare aenean.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ac turpis egestas maecenas pharetra convallis posuere.
                  Ultrices dui sapien eget mi proin sed libero enim. Elementum
                  facilisis leo vel fringilla. Sed tempus urna et pharetra
                  pharetra massa massa ultricies ridiculus mus mauris vitae
                  ultricies leo integer. Eget mauris pharetra et ultrices. Urna
                  neque viverra justo nec ultrices dui sapien. Augue eget arcu
                  dictum varius duis. Eget mauris pharetra et ultrices neque
                  ornare aenean.
                </p>
              </div>
              <div class="cds-layout-1-3">
                <h3>layout 1-3</h3>
                <ul class="cds-list--unordered">
                  <li class="cds-list__item">item 1</li>
                  <li class="cds-list__item">item 2</li>
                  <li class="cds-list__item">item 3</li>
                  <li class="cds-list__item">item 4</li>
                  <li class="cds-list__item">item 5</li>
                  <li class="cds-list__item">item 6</li>
                  <li class="cds-list__item">item 7</li>
                </ul>
                <p>
                  A pellentesque sit amet porttitor. Sed euismod nisi porta
                  lorem. Pellentesque dignissim enim sit amet venenatis urna
                  cursus eget nunc. Eu lobortis elementum nibh tellus molestie
                  nunc non blandit massa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cds-row">
        <div class="cds-col-lg-12">
          <div>
            <div class="cds-row">
              <div class="cds-layout-1-3">
                <h3>layout 1-3</h3>
                <ul class="cds-list--unordered">
                  <li class="cds-list__item">item 1</li>
                  <li class="cds-list__item">item 2</li>
                  <li class="cds-list__item">item 3</li>
                  <li class="cds-list__item">item 4</li>
                  <li class="cds-list__item">item 5</li>
                  <li class="cds-list__item">item 6</li>
                  <li class="cds-list__item">item 7</li>
                </ul>
                <p>
                  A pellentesque sit amet porttitor. Sed euismod nisi porta
                  lorem. Pellentesque dignissim enim sit amet venenatis urna
                  urna urna cursus eget nunc. Eu lobortis elementum nibh tellus
                  molestie nunc non blandit massa.
                </p>
              </div>
              <div class="cds-layout-2-3">
                <h3>layout 2-3</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ac turpis egestas maecenas pharetra convallis posuere.
                  Ultrices dui sapien eget mi proin sed libero enim. Elementum
                  facilisis leo vel fringilla. Sed tempus urna et pharetra
                  pharetra massa massa ultricies ridiculus mus mauris vitae
                  ultricies leo integer. Eget mauris pharetra et ultrices. Urna
                  neque viverra justo nec ultrices dui sapien. Augue eget arcu
                  dictum varius duis. Eget mauris pharetra et ultrices neque
                  ornare aenean.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ac turpis egestas maecenas pharetra convallis posuere.
                  Ultrices dui sapien eget mi proin sed libero enim. Elementum
                  facilisis leo vel fringilla. Sed tempus urna et pharetra
                  pharetra massa massa ultricies ridiculus mus mauris vitae
                  ultricies leo integer. Eget mauris pharetra et ultrices. Urna
                  neque viverra justo nec ultrices dui sapien. Augue eget arcu
                  dictum varius duis. Eget mauris pharetra et ultrices neque
                  ornare aenean.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default {
  title: 'Components/Layout',
  decorators: [
    (story) => html`
      ${story()}
      <style>
        ${styles}
        ${list}
      </style>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};

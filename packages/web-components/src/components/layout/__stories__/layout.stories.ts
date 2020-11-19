/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import styles from '../../../../../styles/scss/components/layout/_layout.scss';

export const Default = () => {
  return html`
    <div class="layout"></div>
  `;
};

export default {
  title: 'Components/Layout',
  decorators: [
    () => html`
      <div style="width:100%" class="bx--grid bx--layout--top-layout-03 bx--layout--bottom-layout-06">
        <div class="bx--row bx--layout--top-layout-03 bx--layout--bottom-layout-06">
          <div class="bx--layout-2-3">
            <h3>Column 2-3</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ac turpis egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget mi proin sed libero enim.
              Elementum facilisis leo vel fringilla. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Nascetur
              ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra et ultrices. Urna neque viverra justo nec
              ultrices dui sapien. Augue eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque ornare aenean.
            </p>
            <p>
              A pellentesque sit amet porttitor. Sed euismod nisi porta lorem. Pellentesque dignissim enim sit amet venenatis urna
              cursus eget nunc. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Risus at ultrices mi tempus
              imperdiet nulla malesuada pellentesque elit. Est ultricies integer quis auctor elit sed. Quis risus sed vulputate
              odio ut. Varius sit amet mattis vulputate. Enim ut tellus elementum sagittis vitae et leo. Posuere ac ut consequat
              semper viverra nam libero. Habitant morbi tristique senectus et netus et malesuada fames. Enim neque volutpat ac
              tincidunt vitae semper quis lectus nulla.
            </p>
          </div>
          <div class="bx--layout-1-3">
            <h3>layout 1-3</h3>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ul>
            <p>
              A pellentesque sit amet porttitor. Sed euismod nisi porta lorem. Pellentesque dignissim enim sit amet venenatis urna
              cursus eget nunc. Eu lobortis elementum nibh tellus molestie nunc non blandit massa.
            </p>
          </div>
        </div>
        <div class="bx--row">
          <div class="bx--layout-1-3">
            <h3>layout 1-3</h3>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ul>
            <p>
              A pellentesque sit amet porttitor. Sed euismod nisi porta lorem. Pellentesque dignissim enim sit amet venenatis urna
              cursus eget nunc. Eu lobortis elementum nibh tellus molestie nunc non blandit massa.
            </p>
          </div>
          <div class="bx--layout-2-3">
            <h3>layout 2-3</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ac turpis egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget mi proin sed libero enim.
              Elementum facilisis leo vel fringilla. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Nascetur
              ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra et ultrices. Urna neque viverra justo nec
              ultrices dui sapien. Augue eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque ornare aenean.lorum
              ipsum
            </p>
            <p>
              A pellentesque sit amet porttitor. Sed euismod nisi porta lorem. Pellentesque dignissim enim sit amet venenatis urna
              cursus eget nunc. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Risus at ultrices mi tempus
              imperdiet nulla malesuada pellentesque elit. Est ultricies integer quis auctor elit sed. Quis risus sed vulputate
              odio ut. Varius sit amet mattis vulputate. Enim ut tellus elementum sagittis vitae et leo. Posuere ac ut consequat
              semper viverra nam libero. Habitant morbi tristique senectus et netus et malesuada fames. Enim neque volutpat ac
              tincidunt vitae semper quis lectus nulla.
            </p>
          </div>
        </div>
      </div>
      <style>
        ${styles}
      </style>
    `,
  ],
};

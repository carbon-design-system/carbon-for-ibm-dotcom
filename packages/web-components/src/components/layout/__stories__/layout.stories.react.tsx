/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from '../../../../../styles/scss/components/layout/_layout.scss';
import list from '../../../../../styles/scss/components/list/_list.scss';
import readme from './README.stories.react.mdx';

export const Default = () => (
  <>
    <style type="text/css">
      {styles.cssText}
      {list.cssText}
    </style>
    <div style={{ width: '100%' }} className="bx--grid bx--layout--top-layout-03 bx--layout--bottom-layout-06">
      <div className="bx--row bx--layout--top-layout-03 bx--layout--bottom-layout-06">
        <div className="bx--col-lg-12">
          <div>
            <div className="bx--row">
              <div className="bx--layout-2-3">
                <h3>Column 2-3</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ac turpis egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget mi proin sed
                  libero enim. Elementum facilisis leo vel fringilla. Sed tempus urna et pharetra pharetra massa massa ultricies
                  ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra et ultrices. Urna neque viverra justo nec
                  ultrices dui sapien. Augue eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque ornare aenean.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ac turpis egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget mi proin sed
                  libero enim. Elementum facilisis leo vel fringilla. Sed tempus urna et pharetra pharetra massa massa ultricies
                  ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra et ultrices. Urna neque viverra justo nec
                  ultrices dui sapien. Augue eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque ornare aenean.
                </p>
              </div>
              <div className="bx--layout-1-3">
                <h3>layout 1-3</h3>
                <ul className="bx--list--unordered">
                  <li className="bx--list__item">item 1</li>
                  <li className="bx--list__item">item 2</li>
                  <li className="bx--list__item">item 3</li>
                  <li className="bx--list__item">item 4</li>
                  <li className="bx--list__item">item 5</li>
                  <li className="bx--list__item">item 6</li>
                  <li className="bx--list__item">item 7</li>
                </ul>
                <p>
                  A pellentesque sit amet porttitor. Sed euismod nisi porta lorem. Pellentesque dignissim enim sit amet venenatis
                  urna cursus eget nunc. Eu lobortis elementum nibh tellus molestie nunc non blandit massa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col-lg-12">
          <div>
            <div className="bx--row">
              <div className="bx--layout-1-3">
                <h3>layout 1-3</h3>
                <ul className="bx--list--unordered">
                  <li className="bx--list__item">item 1</li>
                  <li className="bx--list__item">item 2</li>
                  <li className="bx--list__item">item 3</li>
                  <li className="bx--list__item">item 4</li>
                  <li className="bx--list__item">item 5</li>
                  <li className="bx--list__item">item 6</li>
                  <li className="bx--list__item">item 7</li>
                </ul>
                <p>
                  A pellentesque sit amet porttitor. Sed euismod nisi porta lorem. Pellentesque dignissim enim sit amet venenatis
                  urna urna urna cursus eget nunc. Eu lobortis elementum nibh tellus molestie nunc non blandit massa.
                </p>
              </div>
              <div className="bx--layout-2-3">
                <h3>layout 2-3</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ac turpis egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget mi proin sed
                  libero enim. Elementum facilisis leo vel fringilla. Sed tempus urna et pharetra pharetra massa massa ultricies
                  ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra et ultrices. Urna neque viverra justo nec
                  ultrices dui sapien. Augue eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque ornare aenean.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ac turpis egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget mi proin sed
                  libero enim. Elementum facilisis leo vel fringilla. Sed tempus urna et pharetra pharetra massa massa ultricies
                  ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra et ultrices. Urna neque viverra justo nec
                  ultrices dui sapien. Augue eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque ornare aenean.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default {
  title: 'Components/Layout',
  decorators: [story => story()],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};

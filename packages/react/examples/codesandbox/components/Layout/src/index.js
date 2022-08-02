/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';

const App = () => (
  <div className="bx--grid bx--layout--top-layout-03 bx--layout--bottom-layout-06">
    <div className="bx--row">
      <div className="bx--layout-1-3">
        <div className="bx--layout--sticky" style={{ top: 50 }}>
          <h3>Column 1 (layout 1-3) </h3>
          <p style={{ paddingBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ac turpis egestas maecenas pharetra convallis posuere.
            Ultrices dui sapien eget mi proin sed libero enim. Elementum
            facilisis leo vel fringilla. Sed tempus urna et pharetra
            pharetra massa massa ultricies mi. Nascetur ridiculus mus
            mauris vitae ultricies leo integer. Eget mauris pharetra et
            ultrices. Urna neque viverra justo nec ultrices dui sapien.
            Augue eget arcu dictum varius duis. Eget mauris pharetra et
            ultrices neque ornare aenean.
          </p>
        </div>
      </div>
      <div className="bx--layout-2-3">
        <div>
          <h3>Column 2</h3>
          <p style={{ paddingBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ac turpis egestas maecenas pharetra convallis posuere.
            Ultrices dui sapien eget mi proin sed libero enim. Elementum
            facilisis leo vel fringilla. Sed tempus urna et pharetra
            pharetra massa massa ultricies mi. Nascetur ridiculus mus
            mauris vitae ultricies leo integer. Eget mauris pharetra et
            ultrices. Urna neque viverra justo nec ultrices dui sapien.
            Augue eget arcu dictum varius duis. Eget mauris pharetra et
            ultrices neque ornare aenean.
          </p>
        </div>
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));

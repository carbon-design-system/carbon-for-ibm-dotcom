/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import { ScrollAnimations } from "@carbon/ibmdotcom-react/es/components/ScrollAnimations";
import ReactDom from 'react-dom';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-8">
        <ScrollAnimations animation={'fade'} selectorTargets={'h1'}>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
          <h1>This is extra content so we can scroll!</h1>
        </ScrollAnimations>
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));

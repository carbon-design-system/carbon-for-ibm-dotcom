/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './styles.scss';
import { Masthead } from '@carbon/ibmdotcom-react';

export default function App() {
  const mastheadProps = {
    hasProfile: true,
    hasSearch: true
  };
  return (
    <div className='App'>
      <Masthead {...mastheadProps} />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

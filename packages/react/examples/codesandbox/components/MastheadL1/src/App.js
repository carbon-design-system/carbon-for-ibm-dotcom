/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Masthead from '@carbon/ibmdotcom-react/es/components/Masthead/Masthead';
import links from './links';
import './styles.scss';

export default function App() {
  const mastheadProps = {
    navigation: 'default',
    platform: {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    },
    hasNavigation: true,
    hasProfile: true,
    searchProps: {
      hasSearch: true,
      placeHolderText: 'Search all of IBM',
      searchOpenOnload: false,
    },
    mastheadL1Data: {
      title: 'Stock Charts',
      titleLink: 'https://example.com/',
      navigationL1: links,
    },
  };
  return (
    <div className="App">
      <Masthead {...mastheadProps} />
    </div>
  );
}

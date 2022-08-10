/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Masthead } from '@carbon/ibmdotcom-react/es/components/Masthead';
import links from './links';
import './styles.scss';

export default function App() {
  const mastheadProps = {
    navigation: 'default',
    platform: {
      name: 'Stock Charts',
      url: 'https://www.example.com',
    },
    hasNavigation: true,
    hasProfile: true,
    searchProps: {
      hasSearch: true,
      placeHolderText: 'Search all of IBM',
      searchOpenOnload: false,
    },
    mastheadL1Data: {
      navigationL1: links,
    },
  };
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-16">
          <Masthead {...mastheadProps} />
        </div>
      </div>
    </div>
  );
}

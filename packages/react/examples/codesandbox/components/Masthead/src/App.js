/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';
import { Masthead } from '@carbon/ibmdotcom-react/es/components/Masthead';

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

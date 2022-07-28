/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles.scss';
import content from "./data/content";
import { DotcomShell } from "@carbon/ibmdotcom-react/es/components/DotcomShell";

export default function App() {
  return (
    <div className="App">
      <DotcomShell
        mastheadProps={{
          navigation: "default",
          platform: {
            name: "IBM Cloud",
            url: "https://www.ibm.com/cloud",
          },
          searchProps: {
            hasSearch: true,
            placeHolderText: "Search all of IBM",
            searchOpenOnload: false,
          },
          hasNavigation: true,
          hasProfile: true,
        }}
        footerProps={{
          type: "default",
        }}
      >
        {content}
      </DotcomShell>
    </div>
  );
}

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Button from 'carbon-components-react/lib/components/Button';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import FolderAdd from '@carbon/icons-react/lib/folder--add/20';
import React from 'react';
import Search from 'carbon-components-react/lib/components/Search';
import settings from 'carbon-components/es/globals/js/settings';
import View from '@carbon/icons-react/lib/view/20';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const LeadspaceWithSearch = () => (
  <section
    data-autoid={`${stablePrefix}--leadspace-with-search`}
    className={`${prefix}--leadspace-with-search`}>
    <div className={`${prefix}--leadspace-with-search__row`}>
      <div className={`${prefix}--leadspace-with-search__content`}>
        <h1 className={`${prefix}--leadspace-with-search__heading`}>
          Let's troubleshoot
        </h1>
        <Search
          className={`${prefix}--leadspace-with-search__search`}
          placeHolderText="Search keywords"
        />
        <ul className={`${prefix}--leadspace-with-search__button-group`}>
          <li>
            <Button
              kind="tertiary"
              renderIcon={View}
              className={`${prefix}--leadspace-with-search__button`}>
              <span>View your cases</span>
            </Button>
          </li>
          <li>
            <Button
              renderIcon={FolderAdd}
              className={`${prefix}--leadspace-with-search__button`}>
              <span>Open a case</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default LeadspaceWithSearch;

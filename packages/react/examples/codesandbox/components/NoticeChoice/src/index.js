/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState} from 'react';
import { render } from 'react-dom';
import { NoticeChoice } from "@carbon/ibmdotcom-react";
import './styles.scss';

const questionChoices = [1, 2, 3];
const termsConditionLink = ``;
const locale = "us-en";
const country = "US";
const email = "";
const classNames = "";
const enableAllOptIn = false;

const App = () => {
  const [values, setValues] = useState({});
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-lg-12">
          <NoticeChoice
            questionChoices={questionChoices}
            termsConditionLink={termsConditionLink}
            locale={locale}
            country={country}
            onChange={(field, value) => {
              const newValues = { ...values };
              newValues[field] = value;
              setValues(newValues);
            }}
            email={email}
            classNames={classNames}
            enableAllOptIn={enableAllOptIn}
          />
          {Object.keys(values).length > 0 && (
            <div>
              Returned values:
              <code>{JSON.stringify(values)}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));

/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import "./styles.scss";

import React, { useState } from "react";

import { NoticeChoice } from "@carbon/ibmdotcom-react";
import ReactDom from "react-dom";

const questionChoices = [1, 2, 3]
const termsConditionLink = ``
const locale = 'us-en'
const country = 'US'
const email = ''
const classNames = ''
const enableAllOptIn = false

const App = () => {
  const { values, setValues } = useState({});
  return (<div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-lg-12">
        <NoticeChoice
          questionChoices={questionChoices}
          termsConditionLink={termsConditionLink}
          locale={locale}
          country={country}
          onChange={(field, value) => {
            const newValues = { ...values }
            newValues[field] = value;
            setValues(newValues)
          }}
          email={email}
          classNames={classNames}
          enableAllOptIn={enableAllOptIn}
        />
        {Object.keys(values).length > 0 &&
          <div>
            Returned values:
            <code>
              {JSON.stringify(values)}
            </code>
          </div>
        }
      </div>
    </div>
  </div>
  )
}

ReactDom.render(<App />, document.getElementById("app"));
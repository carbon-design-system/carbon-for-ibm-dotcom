/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
*/

import "./styles.scss";

import React from "react";
import ReactDom from "react-dom";

import { TableOfContents } from "@carbon/ibmdotcom-react";

const App = () => (
  <TableOfContents>
    <a name="1" data-title="Section - 1" />
    <h3>Section - 1</h3>
    <p style={{ marginBottom: "200px" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Praesent tristique
      magna sit amet purus gravida quis blandit turpis. Id eu nisl nunc mi
      ipsum. Purus in massa tempor nec feugiat nisl pretium. Sit amet tellus
      cras adipiscing enim eu turpis. Urna id volutpat lacus laoreet. Et leo
      duis ut diam. Lectus magna fringilla urna porttitor rhoncus dolor. Neque
      egestas congue quisque egestas diam in arcu cursus euismod. Vitae et leo
      duis ut diam quam nulla porttitor. Id ornare arcu odio ut sem nulla
      pharetra diam sit. Cursus turpis massa tincidunt dui ut ornare lectus sit
      amet. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar
      pellentesque habitant. Risus viverra adipiscing at in. Ullamcorper morbi
      tincidunt ornare massa eget egestas purus viverra. Hendrerit gravida
      rutrum quisque non tellus orci ac auctor augue.
    </p>

    <a name="2" data-title="Section - 2" />
    <h3>Section - 2</h3>
    <p style={{ marginBottom: "200px" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Praesent tristique
      magna sit amet purus gravida quis blandit turpis. Id eu nisl nunc mi
      ipsum. Purus in massa tempor nec feugiat nisl pretium. Sit amet tellus
      cras adipiscing enim eu turpis. Urna id volutpat lacus laoreet. Et leo
      duis ut diam. Lectus magna fringilla urna porttitor rhoncus dolor. Neque
      egestas congue quisque egestas diam in arcu cursus euismod. Vitae et leo
      duis ut diam quam nulla porttitor. Id ornare arcu odio ut sem nulla
      pharetra diam sit. Cursus turpis massa tincidunt dui ut ornare lectus sit
      amet. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar
      pellentesque habitant. Risus viverra adipiscing at in. Ullamcorper morbi
      tincidunt ornare massa eget egestas purus viverra. Hendrerit gravida
      rutrum quisque non tellus orci ac auctor augue.
    </p>

    <a name="3" data-title="Section - 3" />
    <h3>Section - 3</h3>
    <p style={{ marginBottom: "200px" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Praesent tristique
      magna sit amet purus gravida quis blandit turpis. Id eu nisl nunc mi
      ipsum. Purus in massa tempor nec feugiat nisl pretium. Sit amet tellus
      cras adipiscing enim eu turpis. Urna id volutpat lacus laoreet. Et leo
      duis ut diam. Lectus magna fringilla urna porttitor rhoncus dolor. Neque
      egestas congue quisque egestas diam in arcu cursus euismod. Vitae et leo
      duis ut diam quam nulla porttitor. Id ornare arcu odio ut sem nulla
      pharetra diam sit. Cursus turpis massa tincidunt dui ut ornare lectus sit
      amet. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar
      pellentesque habitant. Risus viverra adipiscing at in. Ullamcorper morbi
      tincidunt ornare massa eget egestas purus viverra. Hendrerit gravida
      rutrum quisque non tellus orci ac auctor augue.
    </p>
  </TableOfContents>
);

ReactDom.render(<App />, document.getElementById("app"));

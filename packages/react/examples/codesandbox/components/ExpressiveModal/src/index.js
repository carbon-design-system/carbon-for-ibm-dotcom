/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import ArrowRight20 from "@carbon/icons-react/es/arrow--right/20";
import { ButtonGroup, ExpressiveModal } from "@carbon/ibmdotcom-react";
import React from "react";
import ReactDom from "react-dom";
import { ModalBody } from "carbon-components-react";

function StoryContent({ title, paragraph, button }) {
  return (
    <div>
      <h1 style={{ marginBottom: "16px" }}>{title}</h1>
      <p style={{ marginBottom: "48px" }}>{paragraph}</p>
      <ButtonGroup
        buttons={[
          {
            href: "https://www.example.com",
            copy: button,
            renderIcon: ArrowRight20,
          },
        ]}
      />
    </div>
  );
}

const App = () => (
  <ExpressiveModal open={true} className="bx--modal--expressive">
    <ModalBody>
      <StoryContent
        title="Lorem ipsum dolor sit amet"
        paragraph="Quisque felis odio, egestas vel tempus iaculis, interdum vel eros. Phasellus pharetra, purus et pretium posuere, ipsum risus pulvinar leo, non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec tincidunt eros. Fusce sollicitudin sit amet quam eu fringilla. Donec tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed nisl dui, scelerisque et augue eget, pharetra commodo elit. In venenatis sapien eu nisl congue suscipit."
        button="Lorem ipsum dolor"
      />
    </ModalBody>
  </ExpressiveModal>
);

ReactDom.render(<App />, document.getElementById("app"));

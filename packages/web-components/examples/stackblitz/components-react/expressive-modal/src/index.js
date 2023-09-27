/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from 'react-dom';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import C4DExpressiveModal from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal';
import C4DExpressiveModalHeader from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-header';
import C4DExpressiveModalCloseButton from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-close-button';
import C4DExpressiveModalHeading from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-heading';
import C4DExpressiveModalBody from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-body';
import C4DExpressiveModalFooter from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-footer';
import C4DButtonExpressive from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import './index.css';

const App = () => (
  <C4DExpressiveModal open={true}>
    <C4DExpressiveModalHeader>
      <C4DExpressiveModalCloseButton></C4DExpressiveModalCloseButton>
      <C4DExpressiveModalHeading>Modal Title</C4DExpressiveModalHeading>
    </C4DExpressiveModalHeader>
    <C4DExpressiveModalBody>
      Quisque felis odio, egestas vel tempus iaculis, interdum vel eros. Phasellus pharetra, purus et pretium posuere, ipsum risus
      pulvinar leo, non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec tincidunt eros. Fusce sollicitudin sit
      amet quam eu fringilla. Donec tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi laoreet, vitae
      facilisis ante convallis. Aenean quis dapibus augue. Sed nisl dui, scelerisque et augue eget, pharetra commodo elit. In
      venenatis sapien eu nisl congue suscipit.
    </C4DExpressiveModalBody>
    <C4DExpressiveModalFooter>
      <C4DButtonExpressive>
        Lorem ipsum <ArrowRight20 slot="icon" />
      </C4DButtonExpressive>
    </C4DExpressiveModalFooter>
  </C4DExpressiveModal>
);

render(<App />, document.getElementById('root'));

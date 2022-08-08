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
import DDSExpressiveModal from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal';
import DDSExpressiveModalHeader from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-header';
import DDSExpressiveModalCloseButton from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-close-button';
import DDSExpressiveModalHeading from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-heading';
import DDSExpressiveModalBody from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-body';
import DDSExpressiveModalFooter from '@carbon/ibmdotcom-web-components/es/components-react/expressive-modal/expressive-modal-footer';
import DDSButtonExpressive from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import './index.css';

const App = () => (
  <DDSExpressiveModal open={true}>
    <DDSExpressiveModalHeader>
      <DDSExpressiveModalCloseButton></DDSExpressiveModalCloseButton>
      <DDSExpressiveModalHeading>Modal Title</DDSExpressiveModalHeading>
    </DDSExpressiveModalHeader>
    <DDSExpressiveModalBody>
      Quisque felis odio, egestas vel tempus iaculis, interdum vel eros. Phasellus pharetra, purus et pretium posuere, ipsum risus
      pulvinar leo, non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec tincidunt eros. Fusce sollicitudin sit
      amet quam eu fringilla. Donec tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi laoreet, vitae
      facilisis ante convallis. Aenean quis dapibus augue. Sed nisl dui, scelerisque et augue eget, pharetra commodo elit. In
      venenatis sapien eu nisl congue suscipit.
    </DDSExpressiveModalBody>
    <DDSExpressiveModalFooter>
      <DDSButtonExpressive>
        Lorem ipsum <ArrowRight20 slot="icon" />
      </DDSButtonExpressive>
    </DDSExpressiveModalFooter>
  </DDSExpressiveModal>
);

render(<App />, document.getElementById('root'));

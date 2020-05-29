/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ExpressiveModal from '../../ExpressiveModal';

/**
 * wrapper for testing open/close expressive modal
 *
 * @returns {object} JSX object
 */
function MockComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} />
      <ExpressiveModal open={isOpen} />
    </>
  );
}

export default MockComponent;

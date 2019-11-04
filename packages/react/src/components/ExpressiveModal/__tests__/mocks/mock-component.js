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

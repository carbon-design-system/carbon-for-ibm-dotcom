/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';
import DotcomModal from '../DotcomModal';

const mockButtons = [
  {
    link: '',
    copy: 'Secondary action button',
    renderIcon: 'ArrowRight',
  },
  {
    link: '',
    copy: 'Primary action button',
    renderIcon: 'ArrowRight',
  },
];

describe('DotcomModal', () => {
  it('renders modal as expected', () => {
    const dotcomModal = shallow(<DotcomModal open={true} />);
    expect(dotcomModal.find('.bx--dotcom-modal')).toHaveLength(1);
  });
  it('shows dotcom buttons when dotcomButtons exists', () => {
    const dotcomModal = shallow(
      <DotcomModal open={true} dotcomButtons={mockButtons}></DotcomModal>
    );
    expect(dotcomModal.find('.bx--dotcom-modal-footer')).toHaveLength(1);
  });
});

/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState } from 'react';
import { CURRENT_THEME } from '../shared';
import { Form } from '@storybook/components';
import PropTypes from 'prop-types';

/**
 * Storybook add-on panel for Carbon theme switcher.
 */
const Panel = ({ api, active }) => {
  const [currentTheme, setCurrentTheme] = useState('white');
  const handleChange = useCallback(
    event => {
      const { value } = event.target;
      setCurrentTheme(value);
      api.getChannel().emit(CURRENT_THEME, value);
    },
    [api]
  );
  return (
    active && (
      <Form>
        <Form.Field label="Select Carbon theme:">
          <Form.Select
            name="carbon-theme"
            value={currentTheme}
            onChange={handleChange}
            size="flex">
            <option key="white" value="white">
              White
            </option>
            <option key="g10" value="g10">
              Gray 10
            </option>
            <option key="g90" value="g90">
              Gray 90
            </option>
            <option key="g100" value="g100">
              Gray 100
            </option>
          </Form.Select>
        </Form.Field>
      </Form>
    )
  );
};

Panel.propTypes = {
  /**
   * The Storybook API object.
   */
  api: PropTypes.shape({
    getChannel: PropTypes.func,
  }).isRequired,

  /**
   * `true` if this Storybook add-on panel is active.
   */
  active: PropTypes.bool.isRequired,
};

export default Panel;

/**
 * Copyright IBM Corp. 2018, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

 'use strict';

 module.exports = {
   extends: [
    //  require.resolve('./base'),
     require.resolve('./rules/react'),
     require.resolve('./rules/jest'),
   ],
 };
 
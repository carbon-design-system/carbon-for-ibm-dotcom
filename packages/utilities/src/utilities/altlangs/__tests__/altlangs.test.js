/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { altlangs } from '../';

describe('alternative languages utility', () => {
  it('should get all available languages on the page', () => {
    document.body.innerHTML = `<link rel="alternate" hreflang="en-us" href="https://www.ibm.com/us-en/">
      <link rel="alternate" hreflang="x-default" href="https://www.ibm.com">
      <link rel="alternate" hreflang="en-af" href="https://www.ibm.com/af-en">
      <link rel="alternate" hreflang="fr-dz" href="https://www.ibm.com/dz-fr">
      <link rel="alternate" hreflang="pt-ao" href="https://www.ibm.com/ao-pt">`;

    const output = altlangs();
    const expected = {
      'en-us': 'https://www.ibm.com/us-en/',
      'x-default': 'https://www.ibm.com',
      'en-af': 'https://www.ibm.com/af-en',
      'fr-dz': 'https://www.ibm.com/dz-fr',
      'pt-ao': 'https://www.ibm.com/ao-pt',
    };
    expect(output).toEqual(expected);
  });
});

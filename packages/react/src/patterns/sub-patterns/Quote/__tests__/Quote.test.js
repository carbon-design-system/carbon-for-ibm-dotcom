/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Quote from '../Quote';
import React from 'react';
import { shallow } from 'enzyme';

describe('Quotes', () => {
  it('renders as expected', () => {
    const source = {
      heading: 'lorem ipsum',
      copy: 'dolor sit amet',
    };

    const cta = {
      copy: 'Link with Icon',
      type: 'local',
      href: 'https://example.com',
    };

    const quote = shallow(
      <Quote
        copy="Lorem ipsum dolor"
        source={source}
        cta={cta}
        inverse={true}
        markType="singleCurved"
      />
    );

    expect(quote.find('.bx--quote')).toHaveLength(1);
    expect(quote.find('.bx--quote__inverse')).toHaveLength(1);
    expect(quote.find('.bx--quote__mark')).toHaveLength(1);
    expect(quote.find('.bx--quote__copy')).toHaveLength(1);
    expect(quote.find('.bx--quote__source')).toHaveLength(1);
    expect(quote.find('.bx--quote__footer')).toHaveLength(1);

    const doubleCurved = shallow(
      <Quote
        copy="Lorem ipsum dolor"
        source={source}
        cta={cta}
        inverse={true}
        markType="doubleCurved"
      />
    );
    expect(doubleCurved.find('.bx--quote__mark')).toHaveLength(1);

    const doubleAngle = shallow(
      <Quote
        copy="Lorem ipsum dolor"
        source={source}
        cta={cta}
        inverse={true}
        markType="doubleAngle"
      />
    );
    expect(doubleAngle.find('.bx--quote__mark')).toHaveLength(1);

    const singleAngle = shallow(
      <Quote
        copy="Lorem ipsum dolor"
        source={source}
        cta={cta}
        inverse={true}
        markType="singleAngle"
      />
    );
    expect(singleAngle.find('.bx--quote__mark')).toHaveLength(1);

    const lowHighReversedDoubleCurved = shallow(
      <Quote
        copy="Lorem ipsum dolor"
        source={source}
        cta={cta}
        inverse={true}
        markType="lowHighReversedDoubleCurved"
      />
    );
    expect(lowHighReversedDoubleCurved.find('.bx--quote__mark')).toHaveLength(
      1
    );

    const noSource = shallow(
      <Quote copy="Lorem ipsum dolor" cta={cta} inverse={false} />
    );
    expect(noSource.find('.bx--quote__source')).toHaveLength(0);
    expect(noSource.find('.bx--quote__inverse')).toHaveLength(0);

    const noCTA = shallow(<Quote copy="Lorem ipsum dolor" inverse={false} />);
    expect(noCTA.find('.bx--quote__footer')).toHaveLength(0);
  });
});

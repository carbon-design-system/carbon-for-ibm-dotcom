/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { CardSectionSimple } from '@carbon/ibmdotcom-react/es/components/CardSectionSimple';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-16">
        <CardSectionSimple
          cards={
            [
              {
                copy: 'Lorem ipsum dolor sit amet',
                heading: 'Aliquam condimentum',
                cta: {
                  href: 'https://www.example.com',
                },
              },
              {
                copy: 'Lorem ipsum dolor sit amet',
                heading: 'Aliquam condimentum',
                cta: {
                  href: 'https://www.example.com',
                },
              },
              {
                copy: 'Lorem ipsum dolor sit amet',
                heading: 'Aliquam condimentum',
                cta: {
                  href: 'https://www.example.com',
                },
              },
              {
                copy: 'Lorem ipsum dolor sit amet',
                heading: 'Aliquam condimentum',
                cta: {
                  href: 'https://www.example.com',
                },
              },
              {
                copy: 'Lorem ipsum dolor sit amet',
                heading: 'Aliquam condimentum',
                cta: {
                  href: 'https://www.example.com',
                },
              },
            ]
          }
          heading="Aliquam condimentum interdum"
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));

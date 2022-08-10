/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';

import { ContentGroupCards } from '@carbon/ibmdotcom-react/es/components/ContentGroupCards';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentGroupCards
          heading="Lorem ipsum dolor sit amet"
          items={[
            {
              heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              cta: {
                href: 'https://www.example.com',
              },
            },
            {
              heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              cta: {
                href: 'https://www.example.com',
              },
            },
          ]}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));

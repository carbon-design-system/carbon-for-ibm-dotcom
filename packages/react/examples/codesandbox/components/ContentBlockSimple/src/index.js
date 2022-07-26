/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { ContentBlockSimple } from '@carbon/ibmdotcom-react/es/components/ContentBlockSimple';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentBlockSimple
          inverse={false}
          heading="Lorem ipsum dolor sit amet"
          copy="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          mediaType="image"
          mediaData={{
            heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: {
              sources: [
                {
                  src: 'https://fpoimg.com/672x672?text=16:9&bg_color=ee5396&text_color=161616',
                  breakpoint: 320,
                },
                {
                  src: 'https://fpoimg.com/400x225?text=16:9&bg_color=ee5396&text_color=161616',
                  breakpoint: 400,
                },
                {
                  src: 'https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616',
                  breakpoint: 672,
                },
              ],
              alt: 'Image alt text',
              defaultSrc: 'https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616',
            },
          }}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));

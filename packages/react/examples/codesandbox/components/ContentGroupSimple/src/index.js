/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { ContentGroupSimple } from '@carbon/ibmdotcom-react/es/components/ContentGroupSimple';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentGroupSimple
          mediaType="image"
          mediaData={{
            image: {
              sources: [
                {
                  src: 'https://fpoimg.com/320x160?text=2:1&bg_color=ee5396&text_color=161616',
                  breakpoint: 320,
                },
                {
                  src: 'https://fpoimg.com/400x400?text=1:1&bg_color=ee5396&text_color=161616',
                  breakpoint: 400,
                },
                {
                  src: 'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
                  breakpoint: 672,
                },
              ],
              alt: 'Image alt text',
              defaultSrc: 'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
            },
          }}
          heading="Lorem ipsum dolor sit amet"
          items={[
            {
              heading: 'Lorem ipsum dolor sit amet.',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
            },
            {
              heading: 'Lorem ipsum dolor sit amet.',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
            },
            {
              heading: 'Lorem ipsum dolor sit amet.',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
            },
            {
              heading: 'Lorem ipsum dolor sit amet.',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
            },
          ]}
          cta={{
            cta: {
              href: 'https://www.example.com',
            },
            style: 'card',
            type: 'local',
            heading: 'Lorem ipsum dolor sit ametttt',
          }}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));

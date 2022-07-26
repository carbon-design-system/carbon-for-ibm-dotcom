/**
 Copyright IBM Corp. 2016, 2022

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
 */

import './styles.scss';

import ReactDom from 'react-dom';
import { ContentBlockMixed } from '@carbon/ibmdotcom-react/es/components/ContentBlockMixed';

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-12">
        <ContentBlockMixed
          heading="Lorem ipsum dolor sit amet"
          copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero."
          cta={{
            cta: {
              href: 'https://www.ibm.com',
            },
            style: 'text',
            type: 'local',
            copy: 'ContentGroupSimple CTA copy',
            heading: 'ContentGroupSimple CTA heading',
          }}
          items={[
            {
              type: 'ContentGroupCards',
              heading: 'ContentGroupCards heading',
              items: [
                {
                  heading: 'ContentGroupCards item heading',
                  copy: 'ContentGroupCards item copy.',
                  cta: {
                    href: 'https://www.ibm.com',
                  },
                },
              ],
            },
            {
              type: 'ContentGroupSimple',
              mediaType: 'image',
              mediaData: {
                sources: [
                  { src: 'https://fpoimg.com/320x160?text=16:9&bg_color=ee5396&text_color=161616', breakpoint: 320 },
                  { src: 'https://fpoimg.com/400x400?text=16:9&bg_color=ee5396&text_color=161616', breakpoint: 400 },
                  { src: 'https://fpoimg.com/672x672?text=16:9&bg_color=ee5396&text_color=161616', breakpoint: 672 },
                ],
                alt: 'Image alt',
                defaultSrc: 'https://fpoimg.com/672x672?text=16:9&bg_color=ee5396&text_color=161616',
              },
              heading: 'ContentGroupSimple heading.',
              items: [
                {
                  heading: 'ContentGroupSimple item heading.',
                  copy: 'ContentGroupSimple item copy.',
                },
              ],
              cta: {
                cta: {
                  href: 'https://www.ibm.com',
                },
                style: 'text',
                type: 'local',
                copy: 'ContentGroupSimple CTA copy',
                heading: 'ContentGroupSimple CTA heading',
              },
            },
          ]}
        />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById('app'));

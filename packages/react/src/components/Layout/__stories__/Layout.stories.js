import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import readme from '../README.md';
import './index.scss';

import Layout from '../Layout';

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const type = {
      '1-4 - 3/4 layout': '1-3',
    };

    const layoutOptions = {
      none: null,
      'layout-01': 'layout-01',
      'layout-02': 'layout-02',
      'layout-03': 'layout-03',
      'layout-04': 'layout-04',
      'layout-05': 'layout-05',
      'layout-06': 'layout-06',
      'layout-07': 'layout-07',
    };

    return (
      <>
        <p style={{ paddingBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis
          egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget
          mi proin sed libero enim. Elementum facilisis leo vel fringilla. Sed
          tempus urna et pharetra pharetra massa massa ultricies mi. Nascetur
          ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra
          et ultrices. Urna neque viverra justo nec ultrices dui sapien. Augue
          eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque
          ornare aenean.
        </p>

        <p style={{ paddingBottom: '1rem' }}>Layout component begins below.</p>

        <Layout
          type={select('Layout Type (type)', type, type['1-4 - 3/4 layout'])}
          marginTop={select(
            'Top Margin (marginTop)',
            layoutOptions,
            layoutOptions['layout-03']
          )}
          marginBottom={select(
            'Bottom Margin (marginBottom)',
            layoutOptions,
            layoutOptions['layout-06']
          )}>
          <div
            data-sticky={select(
              'Sticky left column',
              ['true', 'false'],
              'true'
            )}
            style={{
              backgroundColor: 'white',
            }}>
            <h3>Column 1</h3>

            <ul className="bx--list--unordered">
              <li className="bx--list__item">Item 1</li>
              <li className="bx--list__item">Item 2</li>
              <li className="bx--list__item">Item 3</li>
              <li className="bx--list__item">Item 4</li>
              <li className="bx--list__item">Item 5</li>
              <li className="bx--list__item">Item 6</li>
              <li className="bx--list__item">Item 7</li>
            </ul>
          </div>
          <div>
            <h3>Column 2</h3>
            <p style={{ paddingBottom: '1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac
              turpis egestas maecenas pharetra convallis posuere. Ultrices dui
              sapien eget mi proin sed libero enim. Elementum facilisis leo vel
              fringilla. Sed tempus urna et pharetra pharetra massa massa
              ultricies mi. Nascetur ridiculus mus mauris vitae ultricies leo
              integer. Eget mauris pharetra et ultrices. Urna neque viverra
              justo nec ultrices dui sapien. Augue eget arcu dictum varius duis.
              Eget mauris pharetra et ultrices neque ornare aenean.
            </p>

            <p style={{ paddingBottom: '1rem' }}>
              A pellentesque sit amet porttitor. Sed euismod nisi porta lorem.
              Pellentesque dignissim enim sit amet venenatis urna cursus eget
              nunc. Eu lobortis elementum nibh tellus molestie nunc non blandit
              massa. Risus at ultrices mi tempus imperdiet nulla malesuada
              pellentesque elit. Est ultricies integer quis auctor elit sed.
              Quis risus sed vulputate odio ut. Varius sit amet mattis
              vulputate. Enim ut tellus elementum sagittis vitae et leo. Posuere
              ac ut consequat semper viverra nam libero. Habitant morbi
              tristique senectus et netus et malesuada fames. Enim neque
              volutpat ac tincidunt vitae semper quis lectus nulla.
            </p>

            <p style={{ paddingBottom: '1rem' }}>
              Eu facilisis sed odio morbi quis commodo. Non tellus orci ac
              auctor augue mauris augue. Accumsan tortor posuere ac ut. Orci
              sagittis eu volutpat odio facilisis. Vestibulum mattis ullamcorper
              velit sed ullamcorper morbi. Vestibulum rhoncus est pellentesque
              elit ullamcorper dignissim cras tincidunt. Id leo in vitae turpis
              massa sed elementum. Euismod elementum nisi quis eleifend quam
              adipiscing vitae proin sagittis. Duis ultricies lacus sed turpis
              tincidunt id aliquet. Nibh mauris cursus mattis molestie a iaculis
              at erat pellentesque. Tempus iaculis urna id volutpat lacus.
              Rhoncus aenean vel elit scelerisque mauris.
            </p>

            <p style={{ paddingBottom: '1rem' }}>
              Hac habitasse platea dictumst quisque sagittis. Faucibus nisl
              tincidunt eget nullam non nisi est sit. Volutpat ac tincidunt
              vitae semper quis lectus. Nisi lacus sed viverra tellus in hac.
              Rhoncus dolor purus non enim. Suspendisse sed nisi lacus sed
              viverra. Faucibus vitae aliquet nec ullamcorper sit amet risus
              nullam eget. Augue interdum velit euismod in pellentesque massa.
              Fermentum iaculis eu non diam phasellus vestibulum lorem sed.
              Volutpat maecenas volutpat blandit aliquam etiam erat velit
              scelerisque.
            </p>

            <p style={{ paddingBottom: '1rem' }}>
              Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Elit
              pellentesque habitant morbi tristique senectus. Nunc non blandit
              massa enim nec dui nunc mattis enim. In egestas erat imperdiet sed
              euismod nisi porta lorem mollis. Donec pretium vulputate sapien
              nec sagittis aliquam malesuada bibendum arcu. Auctor urna nunc id
              cursus metus aliquam eleifend mi. Velit aliquet sagittis id
              consectetur. Arcu cursus vitae congue mauris. Gravida rutrum
              quisque non tellus orci ac. At erat pellentesque adipiscing
              commodo elit at. Amet tellus cras adipiscing enim eu turpis
              egestas. Purus gravida quis blandit turpis cursus in hac
              habitasse. Interdum velit laoreet id donec ultrices tincidunt arcu
              non sodales. Interdum posuere lorem ipsum dolor sit. Quam quisque
              id diam vel quam elementum pulvinar etiam non. Massa enim nec dui
              nunc mattis enim. Ac tortor vitae purus faucibus ornare
              suspendisse sed. Non pulvinar neque laoreet suspendisse.
            </p>
          </div>
        </Layout>

        <p style={{ paddingBottom: '1rem' }}>Layout ends above.</p>

        <p style={{ paddingBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis
          egestas maecenas pharetra convallis posuere. Ultrices dui sapien eget
          mi proin sed libero enim. Elementum facilisis leo vel fringilla. Sed
          tempus urna et pharetra pharetra massa massa ultricies mi. Nascetur
          ridiculus mus mauris vitae ultricies leo integer. Eget mauris pharetra
          et ultrices. Urna neque viverra justo nec ultrices dui sapien. Augue
          eget arcu dictum varius duis. Eget mauris pharetra et ultrices neque
          ornare aenean.
        </p>

        <p style={{ paddingBottom: '1rem' }}>
          A pellentesque sit amet porttitor. Sed euismod nisi porta lorem.
          Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc.
          Eu lobortis elementum nibh tellus molestie nunc non blandit massa.
          Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque
          elit. Est ultricies integer quis auctor elit sed. Quis risus sed
          vulputate odio ut. Varius sit amet mattis vulputate. Enim ut tellus
          elementum sagittis vitae et leo. Posuere ac ut consequat semper
          viverra nam libero. Habitant morbi tristique senectus et netus et
          malesuada fames. Enim neque volutpat ac tincidunt vitae semper quis
          lectus nulla.
        </p>

        <p style={{ paddingBottom: '1rem' }}>
          Eu facilisis sed odio morbi quis commodo. Non tellus orci ac auctor
          augue mauris augue. Accumsan tortor posuere ac ut. Orci sagittis eu
          volutpat odio facilisis. Vestibulum mattis ullamcorper velit sed
          ullamcorper morbi. Vestibulum rhoncus est pellentesque elit
          ullamcorper dignissim cras tincidunt. Id leo in vitae turpis massa sed
          elementum. Euismod elementum nisi quis eleifend quam adipiscing vitae
          proin sagittis. Duis ultricies lacus sed turpis tincidunt id aliquet.
          Nibh mauris cursus mattis molestie a iaculis at erat pellentesque.
          Tempus iaculis urna id volutpat lacus. Rhoncus aenean vel elit
          scelerisque mauris.
        </p>
      </>
    );
  });

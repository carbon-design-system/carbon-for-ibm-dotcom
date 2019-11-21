import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_TOC } from '../../../internal/FeatureFlags';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import '../../../../../styles/scss/components/tableofcontents/index.scss';
import TableOfContents from '../TableOfContents';
import readme from '../README.md';

if (DDS_TOC) {
  storiesOf('Table of contents', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const menuLabel = text('menu label', 'Jump to');

      const menuItems = [
        {
          title: 'Cras molestie condimentum',
          id: '8',
        },
        {
          title: 'Praesent fermentum sodales',
          id: '7',
        },
        {
          title: 'Nulla tristique lacinia',
          id: '2',
        },
        {
          title: 'Morbi id nibh metus',
          id: '3',
        },
        {
          title: 'Integer non scelerisque',
          id: '14',
        },
      ];

      const themes = {
        'dark (g100)': 'g100',
        'light (white)': '',
      };

      return (
        <div
          className={`bx--tableofcontents--${select(
            'theme',
            themes,
            themes['light (white)']
          )}`}>
          <div style={{ padding: '2rem' }}>
            <p>
              Praesent fermentum sodales facilisis. Mauris a efficitur sem.
              Aliquam vehicula sapien libero, a viverra felis scelerisque vel.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae;
            </p>
            <p>
              Donec fringilla dui tellus, a pretium diam vehicula et. Etiam non
              vulputate augue. Morbi laoreet diam dapibus sapien pellentesque
              tristique. Morbi id nibh metus. Integer non scelerisque nisl.
            </p>
          </div>

          <TableOfContents menuItems={menuItems} menuLabel={menuLabel}>
            <a name="8" style={{ color: '#000' }}>
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                Cras molestie condimentum
              </h3>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              molestie condimentum consectetur. Nulla tristique lacinia elit, at
              elementum dui gravida non. Mauris et nisl semper, elementum quam
              non, lacinia purus. Vivamus aliquam vitae sapien volutpat
              efficitur. Curabitur sagittis neque facilisis magna posuere
              consectetur. Praesent fermentum sodales facilisis. Mauris a
              efficitur sem. Aliquam vehicula sapien libero, a viverra felis
              scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Donec fringilla dui
              tellus, a pretium diam vehicula et. Etiam non vulputate augue.
              Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi id
              nibh metus. Integer non scelerisque nisl.
            </p>
            <a name="7" style={{ color: '#000' }}>
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                Praesent fermentum sodales
              </h3>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              molestie condimentum consectetur. Nulla tristique lacinia elit, at
              elementum dui gravida non. Mauris et nisl semper, elementum quam
              non, lacinia purus. Vivamus aliquam vitae sapien volutpat
              efficitur. Curabitur sagittis neque facilisis magna posuere
              consectetur. Praesent fermentum sodales facilisis. Mauris a
              efficitur sem. Aliquam vehicula sapien libero, a viverra felis
              scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Donec fringilla dui
              tellus, a pretium diam vehicula et. Etiam non vulputate augue.
              Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi id
              nibh metus. Integer non scelerisque nisl.
            </p>
            <a name="2" style={{ color: '#000' }}>
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                Nulla tristique lacinia
              </h3>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              molestie condimentum consectetur. Nulla tristique lacinia elit, at
              elementum dui gravida non. Mauris et nisl semper, elementum quam
              non, lacinia purus. Vivamus aliquam vitae sapien volutpat
              efficitur. Curabitur sagittis neque facilisis magna posuere
              consectetur. Praesent fermentum sodales facilisis. Mauris a
              efficitur sem. Aliquam vehicula sapien libero, a viverra felis
              scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Donec fringilla dui
              tellus, a pretium diam vehicula et. Etiam non vulputate augue.
              Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi id
              nibh metus. Integer non scelerisque nisl.
            </p>
            <a name="3" style={{ color: '#000' }}>
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                Morbi id nibh metus
              </h3>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              molestie condimentum consectetur. Nulla tristique lacinia elit, at
              elementum dui gravida non. Mauris et nisl semper, elementum quam
              non, lacinia purus. Vivamus aliquam vitae sapien volutpat
              efficitur. Curabitur sagittis neque facilisis magna posuere
              consectetur. Praesent fermentum sodales facilisis. Mauris a
              efficitur sem. Aliquam vehicula sapien libero, a viverra felis
              scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Donec fringilla dui
              tellus, a pretium diam vehicula et. Etiam non vulputate augue.
              Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi id
              nibh metus. Integer non scelerisque nisl.
            </p>
            <a name="14" style={{ color: '#000' }}>
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                Integer non scelerisque
              </h3>
            </a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              molestie condimentum consectetur. Nulla tristique lacinia elit, at
              elementum dui gravida non. Mauris et nisl semper, elementum quam
              non, lacinia purus. Vivamus aliquam vitae sapien volutpat
              efficitur. Curabitur sagittis neque facilisis magna posuere
              consectetur. Praesent fermentum sodales facilisis. Mauris a
              efficitur sem. Aliquam vehicula sapien libero, a viverra felis
              scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Donec fringilla dui
              tellus, a pretium diam vehicula et. Etiam non vulputate augue.
              Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi id
              nibh metus. Integer non scelerisque nisl.
            </p>
          </TableOfContents>
        </div>
      );
    });
}

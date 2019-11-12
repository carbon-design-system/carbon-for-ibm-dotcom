import React from 'react';
import { storiesOf } from '@storybook/react';
import { TABLE_OF_CONTENTS } from '../../../internal/FeatureFlags';
import { withKnobs, select } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/tableofcontents/index.scss';
import TableOfContents from '../TableOfContents';
import readme from '../README.md';

if (TABLE_OF_CONTENTS) {
  storiesOf('Table of contents', module)
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

      const menuItems = [
        {
          title: 'Cras molestie condimentum',
          id: '1',
        },
        {
          title: 'Praesent fermentum sodales',
          id: '2',
        },
        {
          title: 'Nulla tristique lacinia',
          id: '3',
        },
        {
          title: 'Morbi id nibh metus',
          id: '4',
        },
        {
          title: 'Integer non scelerisque',
          id: '5',
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
          <TableOfContents
            layoutType={select(
              'Layout Type (type)',
              type,
              type['1-4 - 3/4 layout']
            )}
            menuItems={menuItems}
            marginTop={select(
              'Top Margin (marginTop)',
              layoutOptions,
              layoutOptions['none']
            )}
            marginBottom={select(
              'Bottom Margin (marginBottom)',
              layoutOptions,
              layoutOptions['none']
            )}>
            <div data-driverlocation="1">
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                {' '}
                Cras molestie condimentum{' '}
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                molestie condimentum consectetur. Nulla tristique lacinia elit,
                at elementum dui gravida non. Mauris et nisl semper, elementum
                quam non, lacinia purus. Vivamus aliquam vitae sapien volutpat
                efficitur. Curabitur sagittis neque facilisis magna posuere
                consectetur. Praesent fermentum sodales facilisis. Mauris a
                efficitur sem. Aliquam vehicula sapien libero, a viverra felis
                scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia Curae; Donec fringilla dui
                tellus, a pretium diam vehicula et. Etiam non vulputate augue.
                Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi
                id nibh metus. Integer non scelerisque nisl.
              </p>
            </div>
            <div data-driverlocation="2">
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                {' '}
                Praesent fermentum sodales{' '}
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                molestie condimentum consectetur. Nulla tristique lacinia elit,
                at elementum dui gravida non. Mauris et nisl semper, elementum
                quam non, lacinia purus. Vivamus aliquam vitae sapien volutpat
                efficitur. Curabitur sagittis neque facilisis magna posuere
                consectetur. Praesent fermentum sodales facilisis. Mauris a
                efficitur sem. Aliquam vehicula sapien libero, a viverra felis
                scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia Curae; Donec fringilla dui
                tellus, a pretium diam vehicula et. Etiam non vulputate augue.
                Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi
                id nibh metus. Integer non scelerisque nisl.
              </p>
            </div>
            <div data-driverlocation="3">
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                {' '}
                Nulla tristique lacinia{' '}
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                molestie condimentum consectetur. Nulla tristique lacinia elit,
                at elementum dui gravida non. Mauris et nisl semper, elementum
                quam non, lacinia purus. Vivamus aliquam vitae sapien volutpat
                efficitur. Curabitur sagittis neque facilisis magna posuere
                consectetur. Praesent fermentum sodales facilisis. Mauris a
                efficitur sem. Aliquam vehicula sapien libero, a viverra felis
                scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia Curae; Donec fringilla dui
                tellus, a pretium diam vehicula et. Etiam non vulputate augue.
                Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi
                id nibh metus. Integer non scelerisque nisl.
              </p>
            </div>
            <div data-driverlocation="4">
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                {' '}
                Morbi id nibh metus{' '}
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                molestie condimentum consectetur. Nulla tristique lacinia elit,
                at elementum dui gravida non. Mauris et nisl semper, elementum
                quam non, lacinia purus. Vivamus aliquam vitae sapien volutpat
                efficitur. Curabitur sagittis neque facilisis magna posuere
                consectetur. Praesent fermentum sodales facilisis. Mauris a
                efficitur sem. Aliquam vehicula sapien libero, a viverra felis
                scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia Curae; Donec fringilla dui
                tellus, a pretium diam vehicula et. Etiam non vulputate augue.
                Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi
                id nibh metus. Integer non scelerisque nisl.
              </p>
            </div>
            <div data-driverlocation="5">
              <h3 style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
                {' '}
                Integer non scelerisque{' '}
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                molestie condimentum consectetur. Nulla tristique lacinia elit,
                at elementum dui gravida non. Mauris et nisl semper, elementum
                quam non, lacinia purus. Vivamus aliquam vitae sapien volutpat
                efficitur. Curabitur sagittis neque facilisis magna posuere
                consectetur. Praesent fermentum sodales facilisis. Mauris a
                efficitur sem. Aliquam vehicula sapien libero, a viverra felis
                scelerisque vel. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia Curae; Donec fringilla dui
                tellus, a pretium diam vehicula et. Etiam non vulputate augue.
                Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi
                id nibh metus. Integer non scelerisque nisl.
              </p>
            </div>
          </TableOfContents>
        </div>
      );
    });
}

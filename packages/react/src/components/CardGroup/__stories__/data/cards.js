/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import imgXlg16x9 from '../../../../../../storybook-images/assets/1312/fpo--3x2--874--004.jpg';
import imgXlg1x1 from '../../../../../../storybook-images/assets/1312/fpo--3x2--874--004.jpg';
import imgXlg2x1 from '../../../../../../storybook-images/assets/1312/fpo--3x2--874--004.jpg';
import imgXlg3x2 from '../../../../../../storybook-images/assets/1312/fpo--3x2--874--004.jpg';
import imgXlg4x3 from '../../../../../../storybook-images/assets/1312/fpo--3x2--874--004.jpg';

const cards = {
  Simple: [
    {
      heading: 'Nunc convallis lobortis Nunc convallis lobortis',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
      cta: {
        href: 'https://www.example.com',
        copy: 'cta text here',
      },
    },
    {
      heading: 'Fusce gravida eu arcu',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.',
      cta: {
        href: 'https://www.example.com',
        copy: 'cta text here',
      },
    },
    {
      heading: 'Interdum et malesuada',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.',
      cta: {
        href: 'https://www.example.com',
        copy: 'cta text here',
      },
    },
    {
      heading: 'Nunc convallis loborti',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      cta: {
        href: 'https://www.example.com',
        copy: 'cta text here',
      },
    },
    {
      heading: 'Nunc convallis lbortis',
      copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin.',
      cta: {
        href: 'https://www.example.com',
        copy: 'cta text here',
      },
    },
  ],
  Images: [
    {
      image: {
        defaultSrc: imgXlg1x1,
        alt: 'Image alt text',
      },
      eyebrow: 'Topic',
      heading: 'Natural language processing.',
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      image: {
        defaultSrc: imgXlg4x3,
        alt: 'Image alt text',
      },
      eyebrow: 'Blog',
      heading: 'Natural language processing.',
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      image: {
        defaultSrc: imgXlg2x1,
        alt: 'Image alt text',
      },
      eyebrow: 'Topic',
      heading: 'Natural language processing.',
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      image: {
        defaultSrc: imgXlg3x2,
        alt: 'Image alt text',
      },
      eyebrow: 'Blog',
      heading:
        'Serving society ethically in the age of Artificial Intelligence.',
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      image: {
        defaultSrc: imgXlg16x9,
        alt: 'Image alt text',
      },
      eyebrow: 'Topic',
      heading:
        'Serving society ethically in the age of Artificial Intelligence.',
      cta: {
        href: 'https://www.example.com',
      },
    },
  ],
  Videos: [
    {
      media: {
        src: '1_9h94wo6b',
        type: 'video',
      },
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      media: {
        src: '1_9h94wo6b',
        type: 'video',
      },
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      media: {
        src: '1_9h94wo6b',
        type: 'video',
      },
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      media: {
        src: '1_9h94wo6b',
        type: 'video',
      },
      cta: {
        href: 'https://www.example.com',
      },
    },
    {
      media: {
        src: '1_9h94wo6b',
        type: 'video',
      },
      cta: {
        href: 'https://www.example.com',
      },
    },
  ],
};

export default cards;

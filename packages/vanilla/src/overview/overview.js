import './markdown.css';
import README from '../../README.md';
import showdown from 'showdown';
import { storiesOf } from '@storybook/html';

storiesOf('Overview|Get Started', module).add('Read Me', () => {
  const converter = new showdown.Converter();
  return `<div class="storybook-center-container"><div class="markdown-body">${converter.makeHtml(
    README
  )}</div></div>`;
});

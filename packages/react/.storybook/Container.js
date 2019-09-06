import React, { Component } from 'react';
import './polyfills';
import './_container.scss';
import { settings } from 'carbon-components';

import { TranslationAPI } from '../../services/src/services/Translation';

const { prefix } = settings;
export default class Container extends Component {
  componentDidMount() {
    if (process.env.CARBON_REACT_STORYBOOK_USE_RTL === 'true') {
      document.documentElement.dir = 'rtl';
    }
    TranslationAPI.getTranslation().then(response => {
      console.log(response);
    });
  }

  render() {
    const { story } = this.props;

    let bgColor = '#ffffff';
    if (
      story().props.context &&
      story().props.context.kind === '[Experimental] UI Shell'
    ) {
      bgColor = '#f3f3f3';
    }

    return (
      <React.StrictMode>
        <div
          data-floating-menu-container=""
          role="main"
          style={{
            backgroundColor: bgColor,
          }}>
          {story()}
        </div>
        <input
          aria-label="input-text-offleft"
          type="text"
          className={`${prefix}--visually-hidden`}
        />
      </React.StrictMode>
    );
  }
}

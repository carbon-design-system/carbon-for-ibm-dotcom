/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, boolean, number, select, text } from '@storybook/addon-knobs';
import { settings } from 'carbon-components';
import {
  FileUploader,
  FileUploaderButton,
  FileUploaderSkeleton,
  Button,
  FileUploaderItem,
  FileUploaderDropContainer,
} from 'carbon-components-react';

const { prefix } = settings;
const buttonKinds = {
  'Primary (primary)': 'primary',
  'Secondary (secondary)': 'secondary',
  'Danger (danger)': 'danger',
  'Ghost (ghost)': 'ghost',
  'Danger Primary (danger--primary)': 'danger--primary',
  'Tertiary (tertiary)': 'tertiary',
};

const filenameStatuses = {
  'Edit (edit)': 'edit',
  'Complete (complete)': 'complete',
  'Uploading (uploading)': 'uploading',
};

const props = {
  fileUploaderButton: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      className: 'bob',
      labelText: text('Label text (labelText)', 'Add files'),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      disabled: boolean('Disabled (disabled)', false),
      buttonKind: buttonKind || 'primary',
      disableLabelChanges: boolean(
        'Prevent the label from being replaced with file selected file (disableLabelChanges)',
        false
      ),
      role: text('ARIA role of the button (role)', 'button'),
      tabIndex: number('Tab index (tabIndex)', 0),
      onChange: action('onChange'),
    };
  },
  fileUploader: () => ({
    labelTitle: text('The label title (labelTitle)', 'Upload'),
    labelDescription: text(
      'The label description (labelDescription)',
      'only .jpg files at 500mb or less'
    ),
    buttonLabel: text('The button label (buttonLabel)', 'Add files'),
    filenameStatus: select('Status for file name (filenameStatus)', filenameStatuses, 'edit'),
    accept: array('Accepted file extensions (accept)', ['.jpg', '.png'], ','),
    name: text('Form item name: (name)', ''),
    multiple: boolean('Supports multiple files (multiple)', true),
    iconDescription: text('Close button icon description (iconDescription)', 'Clear file'),
  }),
  fileUploaderItem: () => ({
    name: text('Filename (name)', 'README.md'),
    status: select('Status for file name (status)', filenameStatuses, 'edit'),
    iconDescription: text('Close button icon description (iconDescription)', 'Clear file'),
    onDelete: action('onDelete'),
    invalid: boolean('Invalid (invalid)', false),
    errorSubject: text('Error subject (errorSubject)', 'File size exceeds limit'),
    errorBody: text(
      'Error body (errorBody)',
      '500kb max file size. Select a new file and try again.'
    ),
  }),
  fileUploaderDropContainer: () => ({
    labelText: text('Label text (labelText)', 'Drag and drop files here or click to upload'),
    name: text('Form item name (name)', ''),
    multiple: boolean('Supports multiple files (multiple)', true),
    accept: array(
      'Accepted MIME types or file extensions (accept)',
      ['image/jpeg', 'image/png'],
      ','
    ),
    disabled: boolean('Disabled (disabled)', false),
    role: text('ARIA role of the button (role)', ''),
    tabIndex: number('Tab index (tabIndex)', 0),
    onChange: action('onChange'),
  }),
};

export default {
  title: 'FileUploader',
  decorators: [withKnobs],
};

export const _FileUploaderButton = () => <FileUploaderButton {...props.fileUploaderButton()} />;

_FileUploaderButton.story = {
  name: 'FileUploaderButton',

  parameters: {
    info: {
      text: `
          The FileUploaderButton can be used as a standalone component if you do not need the extra UI that comes with FileUploader. The FileUploaderButton is used in FileUploader.
        `,
    },
  },
};

export const _FileUploader = () => {
  let fileUploader;
  return (
    <div className={`${prefix}--file__container`}>
      <FileUploader {...props.fileUploader()} ref={node => (fileUploader = node)} />
      <Button
        kind="secondary"
        small
        style={{ marginTop: '1rem' }}
        onClick={() => {
          fileUploader.clearFiles();
        }}
      >
        Clear File
      </Button>
    </div>
  );
};

_FileUploader.story = {
  name: 'FileUploader',

  parameters: {
    info: {
      text: `
          The FileUploader components allow the user to upload any necessary files. This uses the FileUploaderButton and Filename components. Filename components will appear below the FileUploaderButton when files are added. Use the filenameStatus prop to control what icon appears in Filename ('edit', 'complete', or 'uploading').
        `,
    },
  },
};

export const _FileUploaderItem = () => <FileUploaderItem {...props.fileUploaderItem()} />;

_FileUploaderItem.story = {
  name: 'FileUploaderItem',

  parameters: {
    info: {
      text: `
        <FileUploaderItem /> represents an item that has been uploaded to the file uploader component. Use the \`status\` prop to control which icon appears ('edit', 'complete', or 'uploading').
      `,
    },
  },
};

export const _FileUploaderDropContainer = () => (
  <FileUploaderDropContainer {...props.fileUploaderDropContainer()} />
);

_FileUploaderDropContainer.story = {
  name: 'FileUploaderDropContainer',

  parameters: {
    info: {
      text:
        '<FileUploaderDropContainer /> is a drag and drop file uploader which allows users to upload files via both the normal file selection dialog and by dragging and dropping files.',
    },
  },
};

export const DragAndDropUploadContainerExampleApplication = () =>
  require('./stories/drop-container').default(props.fileUploaderDropContainer());

DragAndDropUploadContainerExampleApplication.story = {
  name: 'Drag and drop upload container example application',

  parameters: {
    info: {
      text: 'Example application with drag and drop file uploader',
    },
  },
};

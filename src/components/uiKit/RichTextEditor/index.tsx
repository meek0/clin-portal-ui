import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import styles from './index.module.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code',
];

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: OnChangeHandler;
};

const RichTextEditor = ({ value, onChange, placeholder }: Props) => (
  <>
    <ReactQuill
      theme="snow"
      value={value || ''}
      modules={modules}
      formats={formats}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.richTextEditor}
    />
  </>
);

export default RichTextEditor;

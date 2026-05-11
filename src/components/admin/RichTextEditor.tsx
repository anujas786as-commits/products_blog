'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-muted animate-pulse rounded-xl" />,
});

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
}

export default function RichTextEditor({ name, defaultValue = '' }: RichTextEditorProps) {
  const [content, setContent] = useState(defaultValue);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={content} />
      <div className="bg-background rounded-xl overflow-hidden border">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          className="h-96"
        />
      </div>
      <style jsx global>{`
        .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          font-family: inherit;
          font-size: 1rem;
        }
        .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          background: #f9fafb;
          border-color: #e5e7eb !important;
        }
        .ql-container.ql-snow {
          border-color: #e5e7eb !important;
          height: 400px;
        }
        .dark .ql-toolbar {
          background: #1f2937;
          border-color: #374151 !important;
        }
        .dark .ql-container.ql-snow {
          border-color: #374151 !important;
        }
      `}</style>
    </div>
  );
}

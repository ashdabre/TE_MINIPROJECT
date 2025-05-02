import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy } from 'lucide-react';

interface CodePreviewProps {
  code: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        title="Copy code"
      >
        <Copy className="h-4 w-4" />
      </button>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        customStyle={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
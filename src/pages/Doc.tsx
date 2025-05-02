
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../index.css';
import '../pages/styleit.css';
import {
  Book,
  Download,
  FileText,
  Layout,
  Palette,
  Code,
  Image as ImageIcon,
  Github,
  FileDown,
  Plus,
  Trash2,
  Save,
  Clock,
  RefreshCw,
  Sparkles,
  Clipboard,
  CheckCircle,
  Undo,
  Redo,
  BookOpen,
  FileQuestion,
  Settings,
  Info
} from 'lucide-react';

type Template = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  defaultSections: string[];
};

type Section = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  lastEdited?: Date;
};

type HistoryState = {
  sections: Section[];
  activeTemplate: string;
};

function Docu() {
  const [activeTemplate, setActiveTemplate] = useState<string>('modern');
  const [sections, setSections] = useState<Section[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and minimalist design with clear hierarchy',
      icon: <Layout className="w-6 h-6" />,
      defaultSections: ['Overview', 'Features', 'Getting Started', 'Usage', 'Contributing'],
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Detailed documentation with code blocks',
      icon: <Code className="w-6 h-6" />,
      defaultSections: ['Installation', 'API Reference', 'Examples', 'Configuration', 'Troubleshooting'],
    },
    {
      id: 'visual',
      name: 'Visual',
      description: 'Image-focused layout with visual guides',
      icon: <ImageIcon className="w-6 h-6" />,
      defaultSections: ['Project Gallery', 'Design System', 'Components', 'Mockups', 'User Flow'],
    },
    {
      id: 'github',
      name: 'GitHub README',
      description: 'Standard GitHub README.md format',
      icon: <Github className="w-6 h-6" />,
      defaultSections: ['Project Name', 'Description', 'Installation', 'Usage', 'License'],
    },
  ];

  // Initialize sections based on template
  useEffect(() => {
    const template = templates.find(t => t.id === activeTemplate);
    if (template && sections.length === 0) {
      const initialSections = template.defaultSections.map((title, index) => ({
        id: String(index + 1),
        title,
        content: '',
        lastEdited: new Date()
      }));
      setSections(initialSections);
      addToHistory(initialSections, activeTemplate);
    }
  }, [activeTemplate]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      const timer = setTimeout(() => {
        localStorage.setItem('docucraft-sections', JSON.stringify(sections));
        localStorage.setItem('docucraft-template', activeTemplate);
        localStorage.setItem('docucraft-darkMode', String(darkMode));
        setLastSaved(new Date());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sections, autoSave, activeTemplate, darkMode]);

  // Load saved content
  useEffect(() => {
    const savedSections = localStorage.getItem('docucraft-sections');
    const savedTemplate = localStorage.getItem('docucraft-template');
    const savedDarkMode = localStorage.getItem('docucraft-darkMode');
    
    if (savedSections) {
      const parsedSections = JSON.parse(savedSections);
      setSections(parsedSections);
      addToHistory(parsedSections, savedTemplate || 'modern');
    }
    if (savedTemplate) {
      setActiveTemplate(savedTemplate);
    }
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  const addToHistory = (newSections: Section[], template: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ sections: [...newSections], activeTemplate: template });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setSections(prevState.sections);
      setActiveTemplate(prevState.activeTemplate);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setSections(nextState.sections);
      setActiveTemplate(nextState.activeTemplate);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleSectionChange = (id: string, content: string) => {
    const newSections = sections.map(section => 
      section.id === id ? { ...section, content, lastEdited: new Date() } : section
    );
    setSections(newSections);
    addToHistory(newSections, activeTemplate);
  };

  const handleImageUrlChange = (id: string, imageUrl: string) => {
    const newSections = sections.map(section => 
      section.id === id ? { ...section, imageUrl, lastEdited: new Date() } : section
    );
    setSections(newSections);
    addToHistory(newSections, activeTemplate);
  };

  const addSection = () => {
    const newId = String(sections.length + 1);
    const newSections = [...sections, { 
      id: newId, 
      title: 'New Section', 
      content: '',
      lastEdited: new Date()
    }];
    setSections(newSections);
    addToHistory(newSections, activeTemplate);
  };

  const removeSection = (id: string) => {
    const newSections = sections.filter(section => section.id !== id);
    setSections(newSections);
    addToHistory(newSections, activeTemplate);
  };

  const updateSectionTitle = (id: string, title: string) => {
    const newSections = sections.map(section => 
      section.id === id ? { ...section, title, lastEdited: new Date() } : section
    );
    setSections(newSections);
    addToHistory(newSections, activeTemplate);
  };

  const copyToClipboard = async () => {
    const content = generateContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateContent = () => {
    switch (activeTemplate) {
      case 'github':
        return sections
          .map(section => `# ${section.title}\n\n${section.content}`)
          .join('\n\n');
      case 'technical':
        return sections
          .map(section => `## ${section.title}\n\`\`\`\n${section.content}\n\`\`\``)
          .join('\n\n');
      case 'visual':
        return sections
          .map(section => `### ${section.title}\n\n${section.imageUrl ? `![${section.title}](${section.imageUrl})\n\n` : ''}${section.content}`)
          .join('\n\n');
      default: // modern
        return sections
          .map(section => `## ${section.title}\n\n${section.content}`)
          .join('\n\n---\n\n');
    }
  };

  const handleDownload = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `documentation-${activeTemplate}-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const renderPreview = () => {
    const content = generateContent();
    return (
      <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold">DragNative- Documentation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className={`p-2 rounded-lg ${
                    historyIndex <= 0 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Undo className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className={`p-2 rounded-lg ${
                    historyIndex >= history.length - 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Redo className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>
                  {lastSaved ? `Last saved: ${formatDate(lastSaved)}` : 'Not saved yet'}
                </span>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                  autoSave ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoSave ? 'animate-spin' : ''}`} />
                <span>{autoSave ? 'Auto-saving' : 'Auto-save off'}</span>
              </button>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FileQuestion className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {darkMode ? (
                  <Layout className="w-5 h-5" />
                ) : (
                  <Palette className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg max-w-2xl w-full mx-4`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Help & Tips</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Templates</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Modern:</strong> Clean and minimalist documentation style</li>
                  <li><strong>Technical:</strong> Code-focused documentation with syntax highlighting</li>
                  <li><strong>Visual:</strong> Image-rich documentation with visual elements</li>
                  <li><strong>GitHub README:</strong> Standard GitHub README.md format</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Auto-save functionality</li>
                  <li>Dark mode support</li>
                  <li>Markdown preview</li>
                  <li>Undo/Redo support</li>
                  <li>Export to markdown</li>
                  <li>Copy to clipboard</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Keyboard Shortcuts</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><kbd>Ctrl</kbd> + <kbd>Z</kbd>: Undo</li>
                  <li><kbd>Ctrl</kbd> + <kbd>Y</kbd>: Redo</li>
                  <li><kbd>Ctrl</kbd> + <kbd>S</kbd>: Save manually</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Editor */}
          <div className={`space-y-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setActiveTemplate(template.id);
                      if (sections.length === 0) {
                        const initialSections = template.defaultSections.map((title, index) => ({
                          id: String(index + 1),
                          title,
                          content: '',
                          lastEdited: new Date()
                        }));
                        setSections(initialSections);
                        addToHistory(initialSections, template.id);
                      }
                    }}
                    className={`p-4 rounded-lg border transition-all ${
                      activeTemplate === template.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900'
                        : `${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      {template.icon}
                      <span className="font-medium">{template.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {template.description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className={`text-lg font-semibold bg-transparent border-b ${
                          darkMode ? 'border-gray-700' : 'border-gray-200'
                        } focus:outline-none focus:border-indigo-500 w-full`}
                      />
                      {section.lastEdited && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Last edited: {formatDate(new Date(section.lastEdited))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={section.content}
                    onChange={(e) => handleSectionChange(section.id, e.target.value)}
                    className={`w-full h-32 p-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder={`Enter ${section.title.toLowerCase()} content...`}
                  />
                  {activeTemplate === 'visual' && (
                    <input
                      type="text"
                      value={section.imageUrl || ''}
                      onChange={(e) => handleImageUrlChange(section.id, e.target.value)}
                      placeholder="Enter image URL..."
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    />
                  )}
                </div>
              ))}
              <button
                onClick={addSection}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section</span>
              </button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-xl font-semibold font-bold">Preview</h1>
    <div className="flex items-center space-x-3">
      <button
        onClick={copyToClipboard}
        className={`flex items-center space-x-2 px-4 py-2 ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
        } rounded-lg hover:opacity-90 transition-colors`}
      >
        {copied ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Clipboard className="w-5 h-5" />
        )}
        <span className="whitespace-pre-wrap">{copied ? 'Copied! ' : 'Copy '}</span>
      </button>
      <button
        onClick={handleDownload}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <FileDown className="w-5 h-5" />
        <span className="whitespace-pre-wrap">Download </span>
      </button>
    </div>
  </div>
  <div className="whitespace-pre-wrap">{renderPreview()}</div>
</div>

        </div>
      </main>
    </div>
  );
}

export default Docu;
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface ToolConfig {
  title: string;
  description: string;
  accept: string;
  multiple: boolean;
}

interface SelectedFile extends File {
  id: string;
}

const Index = () => {
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showDownloads, setShowDownloads] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolConfigs: Record<string, ToolConfig> = {
    'merge-pdf': {
      title: 'Merge PDF Files',
      description: 'Select multiple PDF files to merge them into one document',
      accept: '.pdf',
      multiple: true
    },
    'split-pdf': {
      title: 'Split PDF File',
      description: 'Select a PDF file to split into separate pages',
      accept: '.pdf',
      multiple: false
    },
    'compress-pdf': {
      title: 'Compress PDF',
      description: 'Select PDF files to reduce their file size',
      accept: '.pdf',
      multiple: true
    },
    'pdf-to-word': {
      title: 'Convert PDF to Word',
      description: 'Select PDF files to convert to Word documents',
      accept: '.pdf',
      multiple: true
    },
    'word-to-pdf': {
      title: 'Convert Word to PDF',
      description: 'Select Word documents to convert to PDF',
      accept: '.doc,.docx',
      multiple: true
    },
    'pdf-to-jpg': {
      title: 'Convert PDF to JPG',
      description: 'Select PDF files to convert pages to images',
      accept: '.pdf',
      multiple: true
    },
    'compress-image': {
      title: 'Compress Images',
      description: 'Select images to reduce their file size',
      accept: '.jpg,.jpeg,.png,.webp,.gif',
      multiple: true
    },
    'resize-image': {
      title: 'Resize Images',
      description: 'Select images to change their dimensions',
      accept: '.jpg,.jpeg,.png,.webp,.gif',
      multiple: true
    },
    'convert-image': {
      title: 'Convert Image Format',
      description: 'Select images to convert between different formats',
      accept: '.jpg,.jpeg,.png,.webp,.gif,.bmp,.tiff',
      multiple: true
    },
    'crop-image': {
      title: 'Crop Images',
      description: 'Select images to crop and cut',
      accept: '.jpg,.jpeg,.png,.webp,.gif',
      multiple: true
    },
    'rotate-image': {
      title: 'Rotate Images',
      description: 'Select images to rotate by any angle',
      accept: '.jpg,.jpeg,.png,.webp,.gif',
      multiple: true
    },
    'jpg-to-pdf': {
      title: 'Convert Images to PDF',
      description: 'Select images to convert to PDF document',
      accept: '.jpg,.jpeg,.png,.webp,.gif',
      multiple: true
    },
    'excel-to-pdf': {
      title: 'Excel to PDF',
      description: 'Convert Excel spreadsheets to PDF',
      accept: '.xlsx,.xls',
      multiple: true
    },
    'ppt-to-pdf': {
      title: 'PowerPoint to PDF',
      description: 'Convert presentations to PDF',
      accept: '.pptx,.ppt',
      multiple: true
    },
    'html-to-pdf': {
      title: 'HTML to PDF',
      description: 'Convert web pages to PDF',
      accept: '.html',
      multiple: true
    },
    'txt-to-pdf': {
      title: 'Text to PDF',
      description: 'Convert text files to PDF',
      accept: '.txt',
      multiple: true
    },
    'epub-to-pdf': {
      title: 'EPUB to PDF',
      description: 'Convert eBooks to PDF format',
      accept: '.epub',
      multiple: true
    },
    'xml-to-pdf': {
      title: 'XML to PDF',
      description: 'Convert XML documents to PDF',
      accept: '.xml',
      multiple: true
    }
  };

  const handleToolSelect = (toolName: string) => {
    setCurrentTool(toolName);
    setSelectedFiles([]);
    setMessage(null);
    setShowDownloads(false);
    setProgress(0);
    setMobileMenuOpen(false);
    
    // Scroll to upload section
    setTimeout(() => {
      const uploadSection = document.getElementById('upload-area');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFileSelection = (files: FileList | null) => {
    if (!files) return;
    
    const filesArray = Array.from(files).map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setSelectedFiles(filesArray);
    setMessage(null);
    setShowDownloads(false);
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateProcessing = (): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          setProgress(progress);
          clearInterval(interval);
          setTimeout(resolve, 500);
        } else {
          setProgress(progress);
        }
      }, 200);
    });
  };

  const handleProcessFiles = async () => {
    if (!currentTool || selectedFiles.length === 0) {
      setMessage({ text: 'Please select files first.', type: 'error' });
      return;
    }

    setIsProcessing(true);
    setMessage({ text: 'Processing files...', type: 'info' });
    setProgress(0);

    try {
      await simulateProcessing();
      setMessage({ text: 'Files processed successfully!', type: 'success' });
      setShowDownloads(true);
    } catch (error) {
      setMessage({ text: 'Error processing files.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const getProcessedFileName = (originalName: string) => {
    const toolOutputs: Record<string, string> = {
      'pdf-to-word': 'docx',
      'word-to-pdf': 'pdf',
      'pdf-to-jpg': 'jpg',
      'jpg-to-pdf': 'pdf',
      'compress-pdf': 'pdf',
      'compress-image': 'jpg'
    };

    const extension = toolOutputs[currentTool || ''];
    if (extension) {
      const baseName = originalName.split('.')[0];
      return `${baseName}_processed.${extension}`;
    }
    
    return `${originalName}_processed`;
  };

  const handleDownload = (file: SelectedFile) => {
    setMessage({ text: `Downloading ${getProcessedFileName(file.name)}...`, type: 'info' });
    
    setTimeout(() => {
      setMessage({ text: 'Download started! Check your downloads folder.', type: 'success' });
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">🔧</span>
              <h1 className="text-xl md:text-2xl font-bold">ToolHub Pro</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 lg:gap-8">
              <button onClick={() => scrollToSection('pdf-tools')} className="hover:opacity-80 transition-opacity text-sm lg:text-base">PDF Tools</button>
              <button onClick={() => scrollToSection('image-tools')} className="hover:opacity-80 transition-opacity text-sm lg:text-base">Image Tools</button>
              <button onClick={() => scrollToSection('document-tools')} className="hover:opacity-80 transition-opacity text-sm lg:text-base">Document Tools</button>
              <button onClick={() => scrollToSection('about')} className="hover:opacity-80 transition-opacity text-sm lg:text-base">About</button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-fade-in">
              <nav className="flex flex-col gap-3 bg-white/10 rounded-lg p-4">
                <button onClick={() => scrollToSection('pdf-tools')} className="text-left py-2 hover:opacity-80 transition-opacity">PDF Tools</button>
                <button onClick={() => scrollToSection('image-tools')} className="text-left py-2 hover:opacity-80 transition-opacity">Image Tools</button>
                <button onClick={() => scrollToSection('document-tools')} className="text-left py-2 hover:opacity-80 transition-opacity">Document Tools</button>
                <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:opacity-80 transition-opacity">About</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-16 text-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">All Your Document Tools in One Place</h2>
            <p className="text-lg md:text-xl mb-8 md:mb-12 opacity-90 max-w-3xl mx-auto">Process PDFs, images, and documents online - completely free and secure</p>
            <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
                <div className="opacity-90 text-sm md:text-base">Tools Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
                <div className="opacity-90 text-sm md:text-base">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">Secure</div>
                <div className="opacity-90 text-sm md:text-base">Processing</div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Tools */}
        <section id="pdf-tools" className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">PDF Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[
                { id: 'merge-pdf', icon: '📑', title: 'Merge PDF', desc: 'Combine multiple PDFs into one document' },
                { id: 'split-pdf', icon: '✂️', title: 'Split PDF', desc: 'Extract pages from your PDF' },
                { id: 'compress-pdf', icon: '🗜️', title: 'Compress PDF', desc: 'Reduce PDF file size' },
                { id: 'pdf-to-word', icon: '📄', title: 'PDF to Word', desc: 'Convert PDF to editable Word document' },
                { id: 'word-to-pdf', icon: '📝', title: 'Word to PDF', desc: 'Convert Word documents to PDF' },
                { id: 'pdf-to-jpg', icon: '🖼️', title: 'PDF to JPG', desc: 'Convert PDF pages to images' }
              ].map(tool => (
                <div 
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                  className="bg-white rounded-xl p-6 md:p-8 text-center shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-indigo-500"
                >
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{tool.icon}</div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{tool.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Tools */}
        <section id="image-tools" className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">Image Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[
                { id: 'compress-image', icon: '🖼️', title: 'Compress Image', desc: 'Reduce image file size without losing quality' },
                { id: 'resize-image', icon: '📏', title: 'Resize Image', desc: 'Change image dimensions' },
                { id: 'convert-image', icon: '🔄', title: 'Convert Format', desc: 'Convert between JPG, PNG, WebP, etc.' },
                { id: 'crop-image', icon: '✂️', title: 'Crop Image', desc: 'Cut and crop your images' },
                { id: 'rotate-image', icon: '🔄', title: 'Rotate Image', desc: 'Rotate images by any angle' },
                { id: 'jpg-to-pdf', icon: '📄', title: 'JPG to PDF', desc: 'Convert images to PDF document' }
              ].map(tool => (
                <div 
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                  className="bg-white rounded-xl p-6 md:p-8 text-center shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-indigo-500"
                >
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{tool.icon}</div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{tool.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Tools */}
        <section id="document-tools" className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">Document Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[
                { id: 'excel-to-pdf', icon: '📊', title: 'Excel to PDF', desc: 'Convert Excel spreadsheets to PDF' },
                { id: 'ppt-to-pdf', icon: '📈', title: 'PowerPoint to PDF', desc: 'Convert presentations to PDF' },
                { id: 'html-to-pdf', icon: '🌐', title: 'HTML to PDF', desc: 'Convert web pages to PDF' },
                { id: 'txt-to-pdf', icon: '📝', title: 'Text to PDF', desc: 'Convert text files to PDF' },
                { id: 'epub-to-pdf', icon: '📚', title: 'EPUB to PDF', desc: 'Convert eBooks to PDF format' },
                { id: 'xml-to-pdf', icon: '⚙️', title: 'XML to PDF', desc: 'Convert XML documents to PDF' }
              ].map(tool => (
                <div 
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                  className="bg-white rounded-xl p-6 md:p-8 text-center shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-indigo-500"
                >
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{tool.icon}</div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{tool.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Section */}
        {currentTool && (
          <section id="upload-area" className="py-12 md:py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 md:p-12 text-center hover:border-indigo-500 hover:bg-gray-50 transition-all duration-300">
                <div className="text-5xl md:text-6xl text-indigo-600 mb-4 md:mb-6">📤</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">{toolConfigs[currentTool]?.title}</h3>
                <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">{toolConfigs[currentTool]?.description}</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple={toolConfigs[currentTool]?.multiple}
                  accept={toolConfigs[currentTool]?.accept}
                  onChange={(e) => handleFileSelection(e.target.files)}
                  className="hidden"
                />
                
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
                >
                  Choose Files
                </Button>

                {/* File List */}
                {selectedFiles.length > 0 && (
                  <div className="mt-6 md:mt-8 text-left">
                    {selectedFiles.map((file) => (
                      <div key={file.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg mb-2 gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-gray-800 block truncate">{file.name}</span>
                          <span className="text-gray-500 text-sm">({formatFileSize(file.size)})</span>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors self-start sm:self-auto"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    
                    {isProcessing && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}

                    <Button 
                      onClick={handleProcessFiles}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 mt-4 w-full sm:w-auto"
                    >
                      {isProcessing ? 'Processing...' : 'Process Files'}
                    </Button>
                  </div>
                )}

                {/* Status Message */}
                {message && (
                  <div className={`mt-6 p-4 rounded-lg font-medium text-sm md:text-base text-gray-800 ${
                    message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                    message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                    'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Download Links */}
                {showDownloads && (
                  <div className="mt-6 md:mt-8">
                    <h4 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Download Processed Files:</h4>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                      {selectedFiles.map((file) => (
                        <Button
                          key={file.id}
                          onClick={() => handleDownload(file)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm md:text-base"
                        >
                          Download {getProcessedFileName(file.name)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">Why Choose ToolHub Pro?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: '🔒', title: '100% Secure', desc: 'All files are processed securely and automatically deleted' },
                { icon: '⚡', title: 'Lightning Fast', desc: 'Quick processing with optimized algorithms' },
                { icon: '💰', title: 'Completely Free', desc: 'No hidden costs, no registration required' },
                { icon: '📱', title: 'Any Device', desc: 'Works on desktop, tablet, and mobile devices' }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 md:p-8">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">{feature.icon}</div>
                  <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-800">{feature.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">ToolHub Pro</h4>
              <p className="text-gray-300 text-sm md:text-base">Your one-stop solution for document processing</p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                <li><button onClick={() => scrollToSection('pdf-tools')} className="hover:text-white transition-colors">PDF Tools</button></li>
                <li><button onClick={() => scrollToSection('image-tools')} className="hover:text-white transition-colors">Image Tools</button></li>
                <li><button onClick={() => scrollToSection('document-tools')} className="hover:text-white transition-colors">Document Tools</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 md:pt-8 text-center text-gray-300 text-sm md:text-base">
            <p>&copy; 2024 ToolHub Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

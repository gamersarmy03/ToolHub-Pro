// ToolHub Pro - Main JavaScript File

// Mobile Navigation Toggle Function
function toggleMobileNav() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

class ToolHubPro {
    constructor() {
        this.currentTool = null;
        this.selectedFiles = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFileUpload();
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
    }

    setupMobileNavigation() {
        // Close mobile nav when clicking on nav links
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                const nav = document.getElementById('nav');
                nav.classList.remove('active');
                
                // Handle smooth scrolling for anchor links
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                }
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.getElementById('nav');
            const toggle = document.querySelector('.mobile-nav-toggle');
            
            if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }

    setupEventListeners() {
        // Tool card click events - Fixed to properly handle clicks
        document.addEventListener('click', (e) => {
            const toolCard = e.target.closest('.tool-card');
            if (toolCard) {
                const toolName = toolCard.getAttribute('data-tool');
                if (toolName) {
                    this.selectTool(toolName);
                }
            }
        });

        // File input change event
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelection(e.target.files);
            });
        }

        // Process button click
        const processBtn = document.getElementById('process-btn');
        if (processBtn) {
            processBtn.addEventListener('click', () => {
                this.processFiles();
            });
        }
    }

    setupFileUpload() {
        const uploadBox = document.querySelector('.upload-box');
        if (!uploadBox) return;

        // Drag and drop functionality
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '#667eea';
            uploadBox.style.background = '#f7fafc';
        });

        uploadBox.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '#cbd5e0';
            uploadBox.style.background = 'white';
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '#cbd5e0';
            uploadBox.style.background = 'white';
            
            const files = Array.from(e.dataTransfer.files);
            this.handleFileSelection(files);
        });
    }

    setupSmoothScrolling() {
        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    selectTool(toolName) {
        console.log('Tool selected:', toolName);
        this.currentTool = toolName;
        this.showUploadSection();
        this.updateUploadUI(toolName);
        this.smoothScrollTo('#upload-area');
    }

    showUploadSection() {
        const uploadSection = document.getElementById('upload-area');
        if (uploadSection) {
            uploadSection.style.display = 'block';
            console.log('Upload section shown');
        }
    }

    updateUploadUI(toolName) {
        const toolConfig = this.getToolConfig(toolName);
        
        const uploadTitle = document.getElementById('upload-title');
        const uploadDescription = document.getElementById('upload-description');
        
        if (uploadTitle) uploadTitle.textContent = toolConfig.title;
        if (uploadDescription) uploadDescription.textContent = toolConfig.description;
        
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.setAttribute('accept', toolConfig.accept);
            fileInput.multiple = toolConfig.multiple;
        }
    }

    getToolConfig(toolName) {
        const configs = {
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
                title: 'Convert Excel to PDF',
                description: 'Select Excel files to convert to PDF',
                accept: '.xls,.xlsx',
                multiple: true
            },
            'ppt-to-pdf': {
                title: 'Convert PowerPoint to PDF',
                description: 'Select PowerPoint files to convert to PDF',
                accept: '.ppt,.pptx',
                multiple: true
            },
            'html-to-pdf': {
                title: 'Convert HTML to PDF',
                description: 'Select HTML files to convert to PDF',
                accept: '.html,.htm',
                multiple: true
            },
            'txt-to-pdf': {
                title: 'Convert Text to PDF',
                description: 'Select text files to convert to PDF',
                accept: '.txt',
                multiple: true
            },
            'epub-to-pdf': {
                title: 'Convert EPUB to PDF',
                description: 'Select EPUB files to convert to PDF',
                accept: '.epub',
                multiple: true
            },
            'xml-to-pdf': {
                title: 'Convert XML to PDF',
                description: 'Select XML files to convert to PDF',
                accept: '.xml',
                multiple: true
            }
        };

        return configs[toolName] || {
            title: 'Process Files',
            description: 'Select files to process',
            accept: '*/*',
            multiple: true
        };
    }

    handleFileSelection(files) {
        this.selectedFiles = Array.from(files);
        this.displaySelectedFiles();
        
        if (this.selectedFiles.length > 0) {
            document.getElementById('process-btn').style.display = 'inline-block';
        }
    }

    displaySelectedFiles() {
        const fileList = document.getElementById('file-list');
        if (!fileList) return;

        fileList.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div>
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">(${this.formatFileSize(file.size)})</span>
                </div>
                <button class="remove-file" onclick="toolHub.removeFile(${index})">Remove</button>
            `;
            fileList.appendChild(fileItem);
        });
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.displaySelectedFiles();
        
        if (this.selectedFiles.length === 0) {
            document.getElementById('process-btn').style.display = 'none';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async processFiles() {
        if (!this.currentTool || this.selectedFiles.length === 0) {
            this.showMessage('Please select files first.', 'error');
            return;
        }

        this.showProcessingStatus();
        
        try {
            // Simulate file processing
            await this.simulateProcessing();
            this.showMessage('Files processed successfully!', 'success');
            this.createDownloadLinks();
        } catch (error) {
            this.showMessage('Error processing files: ' + error.message, 'error');
        }
    }

    showProcessingStatus() {
        const fileList = document.getElementById('file-list');
        if (!fileList) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill" id="progress-fill"></div>';
        
        fileList.appendChild(progressBar);
        
        this.showMessage('Processing files...', 'info');
    }

    async simulateProcessing() {
        const progressFill = document.getElementById('progress-fill');
        if (!progressFill) return;

        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(resolve, 500);
                }
                progressFill.style.width = progress + '%';
            }, 200);
        });
    }

    createDownloadLinks() {
        const fileList = document.getElementById('file-list');
        if (!fileList) return;

        const downloadSection = document.createElement('div');
        downloadSection.innerHTML = `
            <h4 style="margin: 2rem 0 1rem 0; color: #2d3748;">Download Processed Files:</h4>
            <div id="download-links"></div>
        `;
        
        fileList.appendChild(downloadSection);

        const downloadLinks = document.getElementById('download-links');
        
        this.selectedFiles.forEach((file, index) => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'upload-btn';
            link.style.display = 'inline-block';
            link.style.margin = '0.5rem';
            link.textContent = `Download ${this.getProcessedFileName(file.name)}`;
            link.onclick = (e) => {
                e.preventDefault();
                this.downloadFile(file, index);
            };
            downloadLinks.appendChild(link);
        });
    }

    getProcessedFileName(originalName) {
        const toolOutputs = {
            'pdf-to-word': 'docx',
            'word-to-pdf': 'pdf',
            'pdf-to-jpg': 'jpg',
            'jpg-to-pdf': 'pdf',
            'compress-pdf': 'pdf',
            'compress-image': 'jpg'
        };

        const extension = toolOutputs[this.currentTool];
        if (extension) {
            const baseName = originalName.split('.')[0];
            return `${baseName}_processed.${extension}`;
        }
        
        return `${originalName}_processed`;
    }

    downloadFile(file, index) {
        // In a real application, this would download the processed file
        // For demo purposes, we'll just show a message
        this.showMessage(`Downloading ${this.getProcessedFileName(file.name)}...`, 'info');
        
        // Simulate download delay
        setTimeout(() => {
            this.showMessage('Download started! Check your downloads folder.', 'success');
        }, 1000);
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.status-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `status-message status-${type}`;
        messageDiv.textContent = message;

        const uploadBox = document.querySelector('.upload-box');
        if (uploadBox) {
            uploadBox.appendChild(messageDiv);
            
            // Auto-remove success messages after 3 seconds
            if (type === 'success') {
                setTimeout(() => {
                    messageDiv.remove();
                }, 3000);
            }
        }
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.toolHub = new ToolHubPro();
    
    // Add some interactive animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.tool-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format date for file timestamps
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ToolHubPro, utils };
}

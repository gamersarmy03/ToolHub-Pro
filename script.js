document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- "Start Exploring Tools" Button Functionality ---
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            document.getElementById('pdf-tools').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- Modal Elements ---
    const toolModal = document.getElementById('toolModal');
    const closeModalButton = document.querySelector('.close-button');
    const modalCloseButton = document.getElementById('modalCloseButton');
    const modalToolTitle = document.getElementById('modal-tool-title');
    const modalToolDescription = document.getElementById('modal-tool-description');
    const modalUploadSection = document.getElementById('modal-upload-section');
    const modalFileInput = document.getElementById('modalFileInput');
    const browseFilesButton = document.getElementById('browseFilesButton');
    const modalProcessingStatus = document.getElementById('modal-processing-status');
    const modalProgressBar = document.getElementById('modalProgressBar');
    const modalDownloadSection = document.getElementById('modal-download-section');
    const modalDownloadLink = document.getElementById('modalDownloadLink');

    // --- Function to Show Modal ---
    function showModal() {
        toolModal.style.display = 'flex'; // Use flex to center content
        document.body.style.overflow = 'hidden'; // Prevent body scroll when modal is open
    }

    // --- Function to Hide Modal ---
    function hideModal() {
        toolModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore body scroll
        resetModalContent(); // Reset modal state when closing
    }

    // --- Function to Reset Modal Content State ---
    function resetModalContent() {
        modalToolTitle.textContent = '';
        modalToolDescription.textContent = '';

        modalUploadSection.style.display = 'block';
        modalProcessingStatus.style.display = 'none';
        modalDownloadSection.style.display = 'none';
        modalFileInput.value = ''; // Clear selected files
        modalProgressBar.style.width = '0%';
        modalProgressBar.textContent = '0%';
    }

    // --- Close Modal Event Listeners ---
    closeModalButton.addEventListener('click', hideModal);
    modalCloseButton.addEventListener('click', hideModal);

    // Close modal if user clicks outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === toolModal) {
            hideModal();
        }
    });

    // --- Tool Definitions for Modal Content ---
    const toolsData = {
        'pdf-merge': {
            title: "Merge PDF Files",
            description: "Combine multiple PDF documents into one cohesive file. Select all PDFs you wish to merge.",
            downloadFileName: "merged_toolhub_pro.pdf"
        },
        'pdf-split': {
            title: "Split PDF File",
            description: "Extract specific pages or ranges from a single PDF document. Upload your PDF to begin.",
            downloadFileName: "split_toolhub_pro.pdf"
        },
        'pdf-compress': {
            title: "Compress PDF",
            description: "Reduce the file size of your PDF documents without compromising quality. Upload your PDF to optimize.",
            downloadFileName: "compressed_toolhub_pro.pdf"
        },
        'pdf-to-word': {
            title: "PDF to Word Conversion",
            description: "Convert your PDF documents into editable Microsoft Word files (.docx).",
            downloadFileName: "converted_toolhub_pro.docx"
        },
        'pdf-unlock': {
            title: "Unlock PDF Security",
            description: "Remove passwords and restrictions from your secured PDF files. Upload the protected PDF.",
            downloadFileName: "unlocked_toolhub_pro.pdf"
        },
        'pdf-rotate': {
            title: "Rotate PDF Pages",
            description: "Adjust the orientation of pages within your PDF documents. Upload your PDF.",
            downloadFileName: "rotated_toolhub_pro.pdf"
        },
        'image-resize': {
            title: "Resize Image",
            description: "Adjust image dimensions to fit any requirement. Upload your image.",
            downloadFileName: "resized_toolhub_pro.png"
        },
        'image-compress': {
            title: "Compress Image",
            description: "Optimize image file size for faster loading times on web and mobile. Upload your image.",
            downloadFileName: "compressed_toolhub_pro.png"
        },
        'image-convert': {
            title: "Image Converter",
            description: "Convert images between popular formats (JPG, PNG, GIF, etc.). Upload your image.",
            downloadFileName: "converted_toolhub_pro.jpg"
        },
        'image-crop': {
            title: "Crop Image",
            description: "Focus on key areas by easily cropping your photos to perfection. Upload your image.",
            downloadFileName: "cropped_toolhub_pro.png"
        },
        'word-to-pdf': {
            title: "Word to PDF Converter",
            description: "Transform your Word documents into universally compatible PDF files.",
            downloadFileName: "word_to_pdf_toolhub_pro.pdf"
        },
        'excel-to-pdf': {
            title: "Excel to PDF Converter",
            description: "Convert your spreadsheets to professional PDF documents effortlessly.",
            downloadFileName: "excel_to_pdf_toolhub_pro.pdf"
        },
        'text-to-pdf': {
            title: "Text to PDF Creator",
            description: "Convert plain text files into well-formatted PDF documents.",
            downloadFileName: "text_to_pdf_toolhub_pro.pdf"
        }
    };

    // --- Handle Tool Button Clicks (Open Modal) ---
    document.querySelectorAll('.tool-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const toolCard = event.target.closest('.tool-card');
            const toolType = toolCard.dataset.tool;
            const toolInfo = toolsData[toolType];

            if (toolInfo) {
                modalToolTitle.textContent = toolInfo.title;
                modalToolDescription.textContent = toolInfo.description;
                modalDownloadLink.setAttribute('download', toolInfo.downloadFileName);

                // For PDF Merge, allow multiple files. For others, typically one.
                if (toolType === 'pdf-merge') {
                    modalFileInput.setAttribute('multiple', 'multiple');
                } else {
                    modalFileInput.removeAttribute('multiple');
                }

                showModal();
            } else {
                console.error("Tool data not found for:", toolType);
                alert("Sorry, this tool is currently unavailable.");
            }
        });
    });

    // --- Simulate File Upload & Processing within Modal ---
    browseFilesButton.addEventListener('click', () => {
        modalFileInput.click(); // Trigger file input click
    });

    modalFileInput.addEventListener('change', () => {
        if (modalFileInput.files.length > 0) {
            // Hide upload section, show processing status
            modalUploadSection.style.display = 'none';
            modalProcessingStatus.style.display = 'block';
            modalProgressBar.style.width = '0%';
            modalProgressBar.textContent = '0%';
            modalDownloadSection.style.display = 'none'; // Ensure download section is hidden

            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                modalProgressBar.style.width = progress + '%';
                modalProgressBar.textContent = progress + '%';

                if (progress >= 100) {
                    clearInterval(interval);
                    modalProcessingStatus.style.display = 'none';
                    modalDownloadSection.style.display = 'block';
                    // In a REAL application, at this point, you'd:
                    // 1. Send files to a backend server.
                    // 2. Server processes files and returns a downloadable URL.
                    // 3. Set `modalDownloadLink.href = 'URL_OF_PROCESSED_FILE';`
                    // For simulation, we just make it a dummy link.
                    modalDownloadLink.href = '#'; // Placeholder for actual download URL
                    console.log("Simulated file processing complete. File is ready for download.");
                }
            }, 200); // Simulate progress every 200ms
        }
    });

    // --- Drag and Drop functionality (Optional, but good for UI) ---
    const dropArea = modalUploadSection;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        modalFileInput.files = files; // Assign dropped files to the file input
        modalFileInput.dispatchEvent(new Event('change')); // Trigger change event
    }
});

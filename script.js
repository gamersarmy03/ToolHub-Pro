document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // "Start Exploring Tools" button functionality (scroll to PDF tools section)
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            document.getElementById('pdf-tools').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Handle tool button clicks
    document.querySelectorAll('.tool-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const toolCard = event.target.closest('.tool-card');
            const toolType = toolCard.dataset.tool; // Gets the value from data-tool attribute
            const originalButtonText = button.textContent;

            // Simulate processing state
            button.textContent = 'Processing...';
            button.disabled = true; // Disable button during processing
            button.style.backgroundColor = '#95a5a6'; // Change color to gray

            console.log(`User initiated the "${toolType.replace(/-/g, ' ').toUpperCase()}" tool.`);

            // --- THIS IS WHERE YOU'D INTEGRATE ACTUAL TOOL LOGIC ---
            // For now, we simulate work with a setTimeout
            setTimeout(() => {
                // Revert button state after simulated processing
                button.textContent = 'Tool Ready!'; // Or 'Download Result', etc.
                button.style.backgroundColor = 'var(--primary-purple)'; // Revert to original color
                button.disabled = false; // Re-enable button

                // In a real application, after processing is done:
                // 1. You might show a file upload form if it's a file processing tool.
                // 2. You might display a success message.
                // 3. You might provide a download link for the processed file.
                // 4. Or, redirect to a specific tool page:
                //    window.location.href = `tools/${toolType}.html`;

                console.log(`"${toolType.replace(/-/g, ' ').toUpperCase()}" tool simulation finished.`);

                // Example of how you might branch based on toolType:
                // if (toolType === 'pdf-merge') {
                //     showPdfMergeInterface();
                // } else if (toolType === 'image-resize') {
                //     showImageResizeInterface();
                // }
                // ... and so on for all tools.

            }, 2000); // Simulate 2 seconds of "work"

        });
    });

    // You can add more interactive JavaScript here, such as:
    // - Form validation for tool inputs
    // - Drag-and-drop file upload handlers
    // - Progress bar updates during file processing
    // - Dynamic content loading for tool interfaces
    // - Modals for tool interfaces (if not redirecting to new pages)
});

// Placeholder functions for future real tool interfaces
function showPdfMergeInterface() {
    console.log("Loading PDF Merge UI...");
    // Here you would inject HTML for PDF merge, add file input, etc.
}

function showImageResizeInterface() {
    console.log("Loading Image Resize UI...");
    // Here you would inject HTML for Image Resize, add file input, width/height inputs, etc.
}
// Add similar functions for other tools.

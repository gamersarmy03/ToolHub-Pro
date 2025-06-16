import React, { useState } from 'react';
// Corrected Lucide React icon imports based on common names and functionality
import { FileUp, Image, FileText, File, ArrowRight, Home, Settings, HelpCircle, LogIn, UserPlus, Combine, Split, Minimize, PlusCircle, MinusCircle, Paintbrush, Lock, Unlock, PenTool, Crop, Repeat, PencilRuler, Text, Eye, Edit3, ImagePlus, RotateCcw, FlipHorizontal, FlipVertical, Trash2 } from 'lucide-react';

// Header Component: Displays the logo and main navigation links.
const Header = ({ onNavigate }) => {
    return (
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center rounded-b-xl">
            {/* Logo and App Name */}
            <div className="flex items-center space-x-2">
                <FileText className="text-[#D8BFD8] w-8 h-8" /> {/* Icon for the logo */}
                <h1 className="text-2xl font-bold text-gray-800">ToolHub Pro</h1>
            </div>
            {/* Navigation Menu */}
            <nav>
                <ul className="flex space-x-6 text-gray-700 font-medium">
                    <li><a href="#" onClick={() => onNavigate('home')} className="hover:text-[#D8BFD8] transition-colors duration-200">Home</a></li>
                    {/* Placeholder links for other sections */}
                    <li><a href="#" className="hover:text-[#D8BFD8] transition-colors duration-200">Tools</a></li>
                    <li><a href="#" className="hover:text-[#D8BFD8] transition-colors duration-200">Pricing</a></li>
                    <li><a href="#" className="hover:text-[#D8BFD8] transition-colors duration-200">Help</a></li>
                    {/* Login/Signup Buttons with icons */}
                    <li><a href="#" className="flex items-center hover:text-[#D8BFD8] transition-colors duration-200"><LogIn className="w-4 h-4 mr-1" /> Login</a></li>
                    <li><a href="#" className="flex items-center hover:text-[#D8BFD8] transition-colors duration-200"><UserPlus className="w-4 h-4 mr-1" /> Signup</a></li>
                </ul>
            </nav>
        </header>
    );
};

// Tool Card Component: Represents an individual tool on the home page.
const ToolCard = ({ icon: Icon, title, description, onClick }) => {
    return (
        <div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer
                       border border-gray-100 hover:border-[#D8BFD8]" // Subtle border and hover effect
            onClick={onClick}
        >
            {/* Tool Icon */}
            <div className="flex justify-center items-center h-16 w-16 bg-[#F3EBF9] rounded-full mx-auto mb-4">
                <Icon className="w-8 h-8 text-[#D8BFD8]" /> {/* Light purple background for icon */}
            </div>
            {/* Tool Title and Description */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
            <p className="text-gray-600 text-sm text-center">{description}</p>
        </div>
    );
};

// Home Page Component: Displays all tool categories and their respective tools.
const HomePage = ({ onSelectTool }) => {
    // Defines the categories and tools available in ToolHub Pro
    const categories = [
        {
            name: "PDF Tools",
            tools: [
                { id: 'merge-pdf', name: "Merge PDF", description: "Combine multiple PDFs into one.", icon: Combine },
                { id: 'split-pdf', name: "Split PDF", description: "Divide a PDF into smaller files.", icon: Split },
                // Changed from 'Compress' to 'Minimize' for compression
                { id: 'compress-pdf', name: "Compress PDF", description: "Reduce PDF file size.", icon: Minimize },
                { id: 'img-to-pdf', name: "Image to PDF", description: "Convert JPG, PNG to PDF.", icon: ImagePlus },
                { id: 'pdf-to-img', name: "PDF to Image", description: "Convert PDF pages to JPG, PNG.", icon: Image },
                { id: 'edit-pdf', name: "Edit PDF", description: "Add text, shapes, highlight.", icon: Edit3 },
                // Using FileText for convert to PDF, as it represents document transformation
                { id: 'convert-to-pdf', name: "Convert to PDF", description: "Word, Excel, PPT to PDF.", icon: FileText },
                // Using File for convert from PDF
                { id: 'convert-from-pdf', name: "Convert from PDF", description: "PDF to Word, Excel, PPT.", icon: File },
                { id: 'watermark-pdf', name: "Watermark PDF", description: "Add text or image watermark.", icon: Paintbrush },
                { id: 'page-numbers', name: "Page Numbers", description: "Add customizable page numbers.", icon: PlusCircle },
                // Changed from 'Protect' to 'Lock' for protection
                { id: 'protect-pdf', name: "Protect PDF", description: "Add password encryption.", icon: Lock },
                { id: 'unlock-pdf', name: "Unlock PDF", description: "Remove password protection.", icon: Unlock },
                { id: 'sign-pdf', name: "Sign PDF", description: "Add electronic signature.", icon: PenTool },
                { id: 'repair-pdf', name: "Repair PDF", description: "Attempt to fix corrupted PDFs.", icon: Settings },
            ]
        },
        {
            name: "Image Tools",
            tools: [
                { id: 'resize-img', name: "Resize Image", description: "Change image dimensions.", icon: Crop },
                { id: 'crop-img', name: "Crop Image", description: "Crop and adjust images.", icon: Crop },
                { id: 'compress-img', name: "Compress Image", description: "Reduce image file size.", icon: Minimize }, // Using Minimize for image compression
                // Changed from 'Convert' to 'Repeat' or a more specific icon like Exchange
                { id: 'convert-img', name: "Convert Image", description: "Convert image formats.", icon: Repeat },
                { id: 'rotate-img', name: "Rotate Image", description: "Rotate by increments or custom angle.", icon: RotateCcw },
                { id: 'flip-img', name: "Flip Image", description: "Horizontal or vertical flip.", icon: FlipHorizontal },
                { id: 'edit-img', name: "Basic Editor", description: "Adjust brightness, contrast, filters.", icon: PencilRuler },
                { id: 'remove-bg', name: "Remove Background", description: "One-click background removal.", icon: Trash2 },
                { id: 'watermark-img', name: "Image Watermark", description: "Add text or image watermark to images.", icon: Paintbrush },
            ]
        },
        {
            name: "Document Tools",
            tools: [
                { id: 'merge-doc', name: "Merge Documents", description: "Combine Word/TXT files.", icon: Combine },
                { id: 'split-doc', name: "Split Documents", description: "Split Word/TXT files.", icon: Split },
                { id: 'text-editor', name: "Text Editor", description: "Basic TXT file editing.", icon: Text },
                { id: 'view-doc', name: "Document Viewer", description: "Read-only view for docs.", icon: Eye },
            ]
        },
        {
            name: "Other Tools",
            tools: [
                { id: 'batch-process', name: "Batch Processor", description: "Process multiple files at once.", icon: Settings },
                { id: 'cloud-integrate', name: "Cloud Integration", description: "Import/Export from cloud.", icon: HelpCircle },
            ]
        }
    ];

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Main Slogan */}
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Your Digital Workspace, Perfected.</h2>

            {/* Render each tool category */}
            {categories.map((category, index) => (
                <section key={index} className="mb-12">
                    {/* Category Header with light purple underline */}
                    <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#D8BFD8] pb-2 inline-block">
                        {category.name}
                    </h3>
                    {/* Grid for displaying tool cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {category.tools.map(tool => (
                            <ToolCard
                                key={tool.id}
                                icon={tool.icon}
                                title={tool.name}
                                description={tool.description}
                                onClick={() => onSelectTool(tool.id, tool.name)} // Pass tool id and name for navigation
                            />
                        ))}
                    </div>
                </section>
            ))}
        </main>
    );
};

// Generic Tool Page Component: Handles file upload, processing feedback, and download.
// This component serves as a template for all individual tool functionalities.
const ToolPage = ({ toolId, toolName, onBack }) => {
    const [fileName, setFileName] = useState(null); // Stores the name of the selected file
    const [isProcessing, setIsProcessing] = useState(false); // Controls processing state
    const [progress, setProgress] = useState(0); // Progress bar value
    const [message, setMessage] = useState(null); // Displays messages (error, info, success)

    // Handles file selection via input
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setMessage(null); // Clear any previous messages
        }
    };

    // Handles file drop event for drag-and-drop area
    const handleDrop = (event) => {
        event.preventDefault(); // Prevent default browser behavior (e.g., opening file)
        const file = event.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setMessage(null); // Clear any previous messages
        }
    };

    // Prevents default drag-over behavior to allow drop
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Simulates file processing
    const handleProcess = () => {
        if (!fileName) {
            setMessage({ type: 'error', text: 'Please select a file first!' });
            return;
        }
        setIsProcessing(true);
        setProgress(0);
        setMessage({ type: 'info', text: 'Processing your file...' });

        // Simulate progress over time
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval); // Stop the progress simulation
                setIsProcessing(false);
                setMessage({ type: 'success', text: 'File processed successfully!' });
                // In a real application, this is where you'd trigger backend processing
                // and then enable a real download link.
            }
        }, 200); // Update progress every 200ms
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back button to return to the home page */}
            <button
                onClick={onBack}
                className="inline-flex items-center px-4 py-2 mb-6 bg-[#D8BFD8] text-white rounded-lg hover:bg-purple-500 transition-colors duration-200 shadow-md"
            >
                <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" /> Back to Tools
            </button>

            {/* Tool Page Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                {toolName}
            </h2>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                {/* Drag-and-Drop File Upload Area */}
                <div
                    className="border-2 border-dashed border-[#D8BFD8] rounded-xl p-12 text-center mb-6
                               flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('file-upload').click()} // Click to open file dialog
                >
                    <FileUp className="w-16 h-16 text-[#D8BFD8] mb-4" /> {/* Upload icon */}
                    <p className="text-gray-700 text-lg font-semibold mb-2">Drag & Drop your file here</p>
                    <p className="text-gray-500 mb-4">or</p>
                    <button className="bg-[#D8BFD8] text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition-colors duration-200 shadow-md">
                        Browse Files
                    </button>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden" // Hide the default file input
                        onChange={handleFileChange}
                    />
                </div>

                {/* Display selected file name */}
                {fileName && (
                    <div className="bg-[#F3EBF9] p-4 rounded-lg flex justify-between items-center mb-6 shadow-sm">
                        <p className="text-gray-800 font-medium">Selected File: <span className="font-semibold text-[#D8BFD8]">{fileName}</span></p>
                        <button
                            onClick={() => setFileName(null)} // Clear selected file
                            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                            aria-label="Remove selected file"
                        >
                            &#x2715; {/* 'X' mark */}
                        </button>
                    </div>
                )}

                {/* Processing Progress Bar */}
                {isProcessing && (
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                        <div
                            className="bg-[#D8BFD8] h-4 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {/* Message Box for feedback (error, info, success) */}
                {message && (
                    <div
                        className={`p-4 rounded-lg mb-4 text-center ${
                            message.type === 'error' ? 'bg-red-100 text-red-700' :
                            message.type === 'info' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                        }`}
                        role="alert"
                    >
                        {message.text}
                    </div>
                )}

                {/* Process Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleProcess}
                        disabled={isProcessing || !fileName} // Disable if processing or no file selected
                        className={`w-full md:w-1/2 lg:w-1/3 px-8 py-4 text-white font-semibold rounded-xl shadow-lg transition-all duration-300
                                   ${isProcessing || !fileName ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D8BFD8] hover:bg-purple-500'}`}
                    >
                        {isProcessing ? 'Processing...' : 'Process File'}
                    </button>
                </div>

                {/* Placeholder for Download/Output Area */}
                {message && message.type === 'success' && (
                    <div className="mt-8 p-6 bg-[#F3EBF9] rounded-xl text-center shadow-inner">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your file is ready!</h3>
                        <button
                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md"
                            onClick={() => {
                                setMessage(null); // Simulate download and clear message
                                setFileName(null); // Clear file name for next operation
                            }}
                        >
                            Download Processed File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Footer Component: Displays copyright and policy links.
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 text-center mt-12 rounded-t-xl">
            <p className="text-sm">&copy; {new Date().getFullYear()} ToolHub Pro. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2 text-gray-400 text-sm">
                <a href="#" className="hover:text-[#D8BFD8]">Privacy Policy</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="hover:text-[#D8BFD8]">Terms of Service</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="hover:text-[#D8BFD8]">Contact Us</a>
            </div>
        </footer>
    );
};

// Main App Component: Manages global state and routes between different pages (Home and Tool Pages).
const App = () => {
    // State to manage the current view: 'home' or a specific tool's ID.
    const [currentPage, setCurrentPage] = useState('home');
    // State to store the name of the currently selected tool for display.
    const [currentToolName, setCurrentToolName] = useState('');

    // Function to navigate to a specific page (e.g., 'home').
    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    // Function to select a tool, which updates the current page and tool name.
    const handleSelectTool = (toolId, toolName) => {
        setCurrentPage(toolId);
        setCurrentToolName(toolName);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter antialiased">
            {/* Tailwind CSS and Inter font import */}
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style>
            {/* Render Header */}
            <Header onNavigate={handleNavigate} />

            {/* Conditional Rendering: Show HomePage or a specific ToolPage based on currentPage state */}
            {currentPage === 'home' ? (
                <HomePage onSelectTool={handleSelectTool} />
            ) : (
                <ToolPage toolId={currentPage} toolName={currentToolName} onBack={() => setCurrentPage('home')} />
            )}
            {/* Render Footer */}
            <Footer />
        </div>
    );
};

export default App;

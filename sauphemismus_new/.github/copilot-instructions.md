# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React project for text generation websites with multiple themes. The project includes:

- **Multiple text generation themes**: Sauphemismus (drinking phrases), Sprichworte (proverbs), justgptthings (general AI content), chessGPT (chess moves)
- **Hugging Face API integration**: Uses the new @huggingface/inference client for text generation and part-of-speech analysis
- **Background image generation**: Uses Pixabay API for theme-relevant background images
- **Buffer system**: Pre-loads content to provide instant responses when users click generate
- **Share functionality**: Allows users to share generated content
- **Tab navigation**: Single-page app with tabs for different themes

## Key Technologies
- React with Vite
- React Router for navigation
- Hugging Face Inference API
- Pixabay API for background images

## API Keys
- Store Hugging Face API key in environment variables
- Store Pixabay API key in environment variables

## Code Style
- Use functional components with hooks
- Keep components modular and reusable
- Use async/await for API calls
- Implement proper error handling

# Text Generator - AI-powered Content Creation

A React application that generates themed text content using AI. This project consolidates multiple text generation websites into a single application with tab navigation.

## Features

- **Multiple Themes**: 
  - 🍻 **Sauphemismus**: German drinking euphemisms
  - ♾️ **Sprichworte**: German proverbs and wisdom
  - 🤖 **justgptthings**: AI-related humor and observations
  - ♟️ **ChessGPT**: Chess moves and strategies

- **AI-Powered**: Uses Hugging Face's Inference API for text generation
- **Dynamic Backgrounds**: Pixabay API integration for theme-relevant background images
- **Buffer System**: Pre-loads content for instant responses
- **Share Functionality**: Share generated content via native sharing or WhatsApp
- **Responsive Design**: Works on desktop and mobile devices

## Technologies

- **React** with Vite for fast development
- **React Router** for navigation between themes
- **Hugging Face Inference API** for text generation
- **Pixabay API** for background images
- **CSS3** with modern features like backdrop-filter

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```env
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key
   VITE_PIXABAY_API_KEY=your_pixabay_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

## Deployment

The app is configured for GitHub Pages deployment. Build files will be output to the `dist` directory.

## Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── services/          # API services
├── data/              # Theme configuration
└── App.jsx            # Main application component
```

## API Configuration

The application uses two APIs:

1. **Hugging Face Inference API**: For text generation
2. **Pixabay API**: For background images

Make sure to add your API keys to the `.env` file.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

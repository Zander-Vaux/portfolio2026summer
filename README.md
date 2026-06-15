# Zander Vaux Portfolio

A modern, responsive portfolio website showcasing XR development, product management, and immersive technology projects.

## 🚀 Live Demo

Visit the live site: [zander-vaux.vercel.app](https://zander-vaux.vercel.app)

## ✨ Features

- **Modern Dark Theme**: Sleek, professional design with smooth animations
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Navigation**: Smooth scrolling and active section highlighting
- **Project Showcase**: Clean grid layout for displaying projects and work
- **Contact Form**: Functional contact form with API integration
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive features and animations
- **Vercel**: Hosting and deployment platform
- **Font Awesome**: Icons and social media links

## 📁 Project Structure

```
portfolio-zander/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── package.json        # Node.js dependencies
├── vercel.json         # Vercel configuration
├── api/
│   └── contact.js      # Contact form API endpoint
├── images/             # Image assets
└── README.md           # Project documentation
```

## 🚀 Deployment on Vercel

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **Node.js**: Version 18 or higher (for local development)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Project**:
   - Framework Preset: "Other"
   - Build Command: Leave empty (static site)
   - Output Directory: Leave empty
   - Install Command: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically deploy your site

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Environment Variables

No environment variables are required for basic deployment. The contact form API will work out of the box.

## 🎨 Customization

### Adding Your Images

1. Replace placeholder images in the `images/` directory:
   - `profile.jpg` - Your profile photo
   - `about.jpg` - About section image
   - `hobbies.jpg` - Hobbies section image

2. Update image references in `index.html` if needed

### Updating Content

1. **Personal Information**: Edit the hero section in `index.html`
2. **Projects**: Update the projects grid in the projects section
3. **Contact Info**: Modify contact details in the contact section
4. **Styling**: Customize colors and fonts in `styles.css`

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding CSS in `styles.css`
3. Update navigation in both HTML and JavaScript
4. Add scroll detection in `script.js`

## 🔧 Local Development

1. **Clone Repository**:
   ```bash
   git clone <your-repo-url>
   cd portfolio-zander
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**: Visit `http://localhost:3000`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Performance

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Responsive images with proper sizing
- **Caching**: Optimized cache headers for static assets

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Email**: zander-vaux@example.com
- **Phone**: 310-310-1619
- **Location**: Culver City, CA
- **Website**: zander-vaux.com

---

Built with ❤️ by Zander Vaux





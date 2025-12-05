# Quick Start Guide 🚀

## For Developers

### Local Development
```bash
cd dashboard-app
npm install
npm run dev
```

### Build for Production
```bash
npm run build
# Output in dist/ folder
```

## For Deployment

### Quick Deploy (Nginx)
1. Build: `npm run build`
2. Copy `dist/*` to `/var/www/dashboard-app/` on server
3. Configure Nginx (see SELF_HOSTING_TUTORIAL.md)
4. Done! 🎉

### Full Tutorial
📖 **See [SELF_HOSTING_TUTORIAL.md](./SELF_HOSTING_TUTORIAL.md) for complete deployment guide**

The tutorial covers:
- ✅ Nginx setup
- ✅ Docker deployment
- ✅ SSL/HTTPS configuration
- ✅ Domain setup
- ✅ Security best practices
- ✅ Troubleshooting

## Technologies Used

- **React 18** - UI Framework
- **Vite** - Build Tool
- **GSAP** - Animations
- **Framer Motion** - Component Animations
- **Three.js** - 3D Graphics
- **CSS3** - Styling

## Project Structure

```
dashboard-app/
├── src/
│   ├── components/     # React components
│   ├── images/         # Image assets
│   ├── App.jsx         # Main app component
│   └── App.css         # Global styles
├── dist/               # Production build output
└── package.json        # Dependencies
```

---

**Need help?** Check the [SELF_HOSTING_TUTORIAL.md](./SELF_HOSTING_TUTORIAL.md) for detailed instructions!


# Self-Hosting Tutorial: Dashboard App from Zero to Hero 🚀

Complete guide to self-host this React dashboard application on your own server.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Building for Production](#building-for-production)
4. [Self-Hosting Options](#self-hosting-options)
5. [Deployment Methods](#deployment-methods)
6. [Server Configuration](#server-configuration)
7. [Domain & SSL Setup](#domain--ssl-setup)
8. [Maintenance & Updates](#maintenance--updates)

---

## Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm** or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended)

### Server Requirements
- **OS**: Linux (Ubuntu 20.04+ recommended), macOS, or Windows Server
- **RAM**: Minimum 2GB (4GB+ recommended)
- **Storage**: 10GB+ free space
- **CPU**: 2+ cores recommended
- **Network**: Static IP address or domain name

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone your repository
git clone <your-repository-url>
cd project-cursor/dashboard-app

# Or if you're already in the project
cd dashboard-app
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Or using pnpm (faster)
pnpm install

# Or using yarn
yarn install
```

### Step 3: Run Development Server

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Step 4: Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` folder.

---

## Self-Hosting Options

### Option 1: Simple Static Hosting (Easiest)
Best for: Small deployments, testing, personal use

### Option 2: Nginx Reverse Proxy (Recommended)
Best for: Production, multiple apps, SSL/HTTPS

### Option 3: Docker Container
Best for: Scalable deployments, easy updates

### Option 4: Cloud Platforms
Best for: Managed hosting, auto-scaling

---

## Deployment Methods

## Method 1: Nginx Static Hosting (Recommended)

### Step 1: Build the Application

```bash
# On your local machine or build server
cd dashboard-app
npm install
npm run build
```

### Step 2: Transfer Files to Server

```bash
# Using SCP (replace with your server details)
scp -r dist/* user@your-server-ip:/var/www/dashboard-app/

# Or using SFTP client (FileZilla, WinSCP, etc.)
# Upload contents of dist/ folder to /var/www/dashboard-app/
```

### Step 3: Install Nginx on Server

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 4: Configure Nginx

Create Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/dashboard-app
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/dashboard-app;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Main location block
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Disable caching for index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/dashboard-app /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 5: Set Permissions

```bash
# Set proper ownership
sudo chown -R www-data:www-data /var/www/dashboard-app
sudo chmod -R 755 /var/www/dashboard-app
```

---

## Method 2: Docker Deployment

### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create nginx.conf (Optional)

Create `nginx.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Step 3: Create .dockerignore

```
node_modules
dist
.git
.env
*.log
```

### Step 4: Build and Run Docker Container

```bash
# Build Docker image
docker build -t dashboard-app .

# Run container
docker run -d -p 80:80 --name dashboard-app dashboard-app

# Or with docker-compose (create docker-compose.yml)
```

### Step 5: Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  dashboard-app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
```

Run with:

```bash
docker-compose up -d
```

---

## Method 3: PM2 with Node.js Server

### Step 1: Install PM2

```bash
npm install -g pm2
```

### Step 2: Create Simple Express Server

Create `server.js`:

```javascript
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 3: Update package.json

Add to `package.json`:

```json
{
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### Step 4: Build and Run with PM2

```bash
# Build the app
npm run build

# Install express
npm install express

# Start with PM2
pm2 start server.js --name dashboard-app

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

---

## Domain & SSL Setup

### Step 1: Point Domain to Server

1. Get your server's IP address:
   ```bash
   curl ifconfig.me
   ```

2. In your domain registrar's DNS settings:
   - Add A record: `@` → `your-server-ip`
   - Add A record: `www` → `your-server-ip`

### Step 2: Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
# Test renewal
sudo certbot renew --dry-run
```

### Step 3: Update Nginx for HTTPS

Certbot will automatically update your Nginx config, or manually:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    root /var/www/dashboard-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Server Configuration

### Firewall Setup (UFW)

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### Automatic Updates

```bash
# Enable automatic security updates (Ubuntu)
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop

# Monitor server resources
htop
```

---

## Maintenance & Updates

### Updating the Application

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install new dependencies
npm install

# 3. Rebuild
npm run build

# 4. Copy new build to server
scp -r dist/* user@server:/var/www/dashboard-app/

# 5. Reload Nginx
ssh user@server "sudo systemctl reload nginx"
```

### Automated Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash

echo "Building application..."
npm run build

echo "Deploying to server..."
scp -r dist/* user@your-server:/var/www/dashboard-app/

echo "Reloading Nginx..."
ssh user@your-server "sudo systemctl reload nginx"

echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Backup Strategy

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf backup_$DATE.tar.gz /var/www/dashboard-app
# Upload to cloud storage or external server
```

---

## Troubleshooting

### Common Issues

1. **404 errors on refresh**
   - Solution: Ensure Nginx has `try_files $uri $uri/ /index.html;`

2. **Assets not loading**
   - Check file permissions: `sudo chown -R www-data:www-data /var/www/dashboard-app`
   - Verify Nginx can read files: `sudo nginx -t`

3. **Port already in use**
   - Check what's using port 80: `sudo lsof -i :80`
   - Stop conflicting service or change port

4. **Build fails**
   - Clear cache: `rm -rf node_modules dist`
   - Reinstall: `npm install`
   - Check Node.js version: `node -v` (should be 18+)

### Logs

```bash
# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# System logs
sudo journalctl -u nginx -f
```

---

## Performance Optimization

### Enable Gzip Compression
Already included in Nginx config above.

### CDN for Static Assets
Consider using Cloudflare or similar CDN for static assets.

### Caching Strategy
- Static assets: 1 year cache
- HTML: No cache
- API responses: Appropriate cache headers

---

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords**
   - Use SSH keys instead of passwords

3. **Regular backups**
   - Automate daily backups

4. **Monitor logs**
   - Check for suspicious activity

5. **Use HTTPS**
   - Always use SSL/TLS certificates

---

## Quick Reference Commands

```bash
# Build
npm run build

# Deploy
scp -r dist/* user@server:/var/www/dashboard-app/

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx

# Test Nginx config
sudo nginx -t

# View logs
sudo tail -f /var/log/nginx/error.log
```

---

## Support & Resources

- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/

---

## Conclusion

You now have a complete self-hosted dashboard application! 🎉

The app is accessible at:
- **HTTP**: http://your-domain.com
- **HTTPS**: https://your-domain.com

For questions or issues, check the troubleshooting section or review server logs.

Happy hosting! 🚀


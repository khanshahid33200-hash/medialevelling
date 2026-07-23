# Deployment Guide for GoDaddy

This guide explains how to deploy your Vite + React application to GoDaddy hosting.

## Prerequisites

1. Node.js and npm installed
2. GoDaddy hosting account with FTP access
3. Basic knowledge of terminal/command prompt

## Deployment Steps

### 1. Build the Application

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

### 2. Prepare Deployment Files

```bash
# This will create a 'deploy' directory with all necessary files
npm run deploy:prepare
```

### 3. Deploy to GoDaddy

#### Option A: Using FTP Client

1. Open your preferred FTP client (FileZilla, WinSCP, etc.)
2. Connect to your GoDaddy FTP server:
   - Host: `ftp.yourdomain.com` (replace with your domain)
   - Username: Your GoDaddy FTP username
   - Password: Your GoDaddy FTP password
   - Port: 21
3. Navigate to the `public_html` directory
4. Upload the contents of the `deploy` directory (not the directory itself)
5. Make sure to upload all files in binary mode

#### Option B: Using Command Line (requires lftp)

```bash
# Run the deployment script
npm run deploy:godaddy

# Follow the prompts to enter your FTP details
```

### 4. Verify Deployment

After uploading, visit your website to ensure everything is working correctly:
- Check the homepage
- Navigate to different routes and refresh the pages
- Test all interactive elements

## Troubleshooting

### 404 Errors on Page Refresh

If you're seeing 404 errors when refreshing pages:

1. Make sure you've uploaded the `.htaccess` file
2. Verify that `mod_rewrite` is enabled on your GoDaddy hosting
3. Check that the `.htaccess` file contains the correct rewrite rules

### Mixed Content Warnings

If you see mixed content warnings:

1. Make sure all your assets are using HTTPS
2. Update any hardcoded HTTP URLs to use HTTPS

## Additional Configuration

### Custom Domain

If you're using a custom domain:

1. Log in to your GoDaddy account
2. Go to your domain's DNS settings
3. Make sure you have an A record pointing to your hosting IP
4. Update any CNAME records if needed

### SSL Certificate

To enable HTTPS:

1. Log in to your GoDaddy account
2. Go to your hosting control panel
3. Look for SSL/TLS settings
4. Install a free Let's Encrypt certificate or use GoDaddy's SSL

## Support

If you encounter any issues, please check the following:

1. Check the browser's developer console for errors
2. Verify file permissions on the server (should be 644 for files and 755 for directories)
3. Ensure all required files were uploaded
4. Check GoDaddy's server error logs for more details

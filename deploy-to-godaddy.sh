#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Create necessary directories
echo "Preparing files for deployment..."
rm -rf deploy
mkdir -p deploy

# Copy built files
cp -r dist/* deploy/
cp public/.htaccess deploy/
cp public/_redirects deploy/
cp public/web.config deploy/
cp vercel.json deploy/

# Fix permissions
find deploy -type f -exec chmod 644 {} \;
find deploy -type d -exec chmod 755 {} \;

echo "Deployment package is ready in the 'deploy' directory"
echo "Please upload the contents of the 'deploy' directory to your GoDaddy public_html folder"

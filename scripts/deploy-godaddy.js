import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const deployDir = path.join(rootDir, 'deploy');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if deploy directory exists
if (!fs.existsSync(deployDir)) {
  console.log('⚠️  No deploy directory found. Running build and prepare first...');
  execSync('npm run build && npm run deploy:prepare', { stdio: 'inherit' });
}

// Get deployment details
console.log('🚀 GoDaddy Deployment');
console.log('--------------------');

rl.question('FTP Host (e.g., ftp.yourdomain.com): ', (host) => {
  rl.question('FTP Username: ', (username) => {
    rl.question('FTP Password (will be hidden): ', (password) => {
      rl.question('Remote directory (e.g., /public_html/): ', (remoteDir) => {
        console.log('\n🚀 Starting deployment to GoDaddy...');
        
        try {
          // Install lftp if not installed
          try {
            execSync('which lftp');
          } catch {
            console.log('⚠️  lftp is not installed. Attempting to install...');
            try {
              execSync('brew install lftp', { stdio: 'inherit' });
            } catch (error) {
              console.error('❌ Failed to install lftp. Please install it manually:');
              console.log('   - macOS: brew install lftp');
              console.log('   - Linux: sudo apt-get install lftp');
              console.log('   - Windows: Use WinSCP or FileZilla for FTP upload');
              process.exit(1);
            }
          }

          // Create FTP script
          const ftpScript = `
            set ftp:ssl-allow no
            set ssl:verify-certificate no
            open -u ${username},${password} ${host}
            mirror -R --delete --verbose ${deployDir} ${remoteDir}
            bye
          `;

          // Execute FTP upload
          console.log('📤 Uploading files to GoDaddy...');
          execSync(`echo "${ftpScript}" | lftp`, { stdio: 'inherit' });
          
          console.log('✅ Deployment completed successfully!');
          console.log(`🌐 Your site should now be live at: https://${host.replace('ftp.', '')}`);
          
        } catch (error) {
          console.error('❌ Deployment failed:', error.message);
          console.log('\n💡 Manual Deployment Instructions:');
          console.log('1. Open your FTP client (FileZilla, WinSCP, etc.)');
          console.log(`2. Connect to ${host} with your credentials`);
          console.log('3. Upload the contents of the "deploy" directory to your public_html folder');
          console.log('4. Make sure to upload all files in binary mode');
        } finally {
          rl.close();
        }
      });
    });
  });
});

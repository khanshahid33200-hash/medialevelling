import admin from 'firebase-admin';

const getApps = () => admin?.apps || admin?.default?.apps || [];

if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'media-levelling-2026';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk-fbsvc@media-levelling-2026.iam.gserviceaccount.com';
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  try {
    if (clientEmail && privateKey) {
      const cert = admin.credential ? admin.credential.cert : admin.default.credential.cert;
      const init = admin.initializeApp || admin.default.initializeApp;
      init({
        credential: cert({
          projectId,
          clientEmail,
          privateKey
        })
      });
      console.log('Firebase Admin SDK initialized successfully');
    } else {
      console.warn('Firebase Admin SDK: FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY missing');
    }
  } catch (err) {
    console.error('Firebase Admin SDK initialization error:', err.message);
  }
}

const activeAdmin = admin.apps ? admin : admin.default;
export const adminDb = activeAdmin && activeAdmin.apps && activeAdmin.apps.length ? activeAdmin.firestore() : null;
export const adminAuth = activeAdmin && activeAdmin.apps && activeAdmin.apps.length ? activeAdmin.auth() : null;

export default activeAdmin;

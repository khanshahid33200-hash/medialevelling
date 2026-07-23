import admin from 'firebase-admin';

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'media-levelling-2026';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk-fbsvc@media-levelling-2026.iam.gserviceaccount.com';
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    // Replace escaped newlines if passed as a single line string
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  try {
    if (clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
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

export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;

export default admin;

import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config()
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  // 'https://www.googleapis.com/auth/drive.appdata',
  // 'https://www.googleapis.com/auth/drive.file',
  // ' https://www.googleapis.com/auth/drive.scripts',
  // 'https://www.googleapis.com/auth/drive.metadata',
];

export const auth = new google.auth.GoogleAuth({
  credentials: {
    "type": process.env.GOOGLE_DRIVE_TYPE,
    "project_id": process.env.GOOGLE_DRIVE_PROJECT_ID,
    "private_key_id": process.env.GOOGLE_DRIVE_PRIVATE_KEY_ID,
    "private_key": process.env.GOOGLE_DRIVE_PRIVATE_KEY,
    "client_email": process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    "client_id": process.env.GOOGLE_DRIVE_CLIENT_ID,
    "auth_uri": process.env.GOOGLE_DRIVE_AUTH_URI,
    "token_uri": process.env.GOOGLE_DRIVE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.GOOGLE_DRIVE_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.GOOGLE_DRIVE_CLIENT_URL
  },
  scopes: SCOPES,
});

export async function createAndUpload(auth, photo) {
  const driveService = google.drive({
    version: 'v3',
    auth: auth,
  });

  const fileMetaData = {
    name: photo.filename,
    parents: ["1tXHw_tLDCHBPgUitRIqF70raXRrrptFL"],
  };

  const media = {
    mimeType: photo.mimetype,
    body: fs.createReadStream(photo.path),
  };

  let response = await driveService.files.create({
    resource: fileMetaData,
    media: media,
    fields: 'id',
  });

  return response.data;
}


export async function deletePhoto(auth, id) {
  const driveService = google.drive({ version: 'v3', auth });
  const response = driveService.files.delete({
    fileId: id,
  });

  return response.data;
}

export async function updatePhoto(auth, photo, idPhoto) {
  const driveService = google.drive({ version: 'v3', auth });
  return new Promise((resolve, reject) => {
    const media = {
      mimeType: photo.mimetype,
      body: fs.createReadStream(photo.path),
    };

    const response = driveService.files.update({
      fileId: idPhoto,
      media: media,
      fields: 'id',
    });

    if (!response) {
      reject(response);
    }
    resolve(response);
  });
}

// createAndUpload(auth)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// updatePhoto(auth)
//   .then((res) => {
//     console.log('Success updated!');
//     console.log(res.data.id);
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log('err');
//   });

// deletePhoto(auth)
//   .then((res) => {
//     console.log(res.data.id);
//   })
//   .catch((err) => console.log(err));

// const app = express();
// app.use(express.json());

// app.get('/', (req, res) => {});

// app.listen(3000, () => {
//   console.log(`Google drive was running!`);
// });

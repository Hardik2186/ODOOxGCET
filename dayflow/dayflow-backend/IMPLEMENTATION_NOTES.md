Changes made:

- Added `models/Company.js` to represent companies (name, logoUrl, createdBy, employees).
- Updated `models/Employee.js` to reference `Company` via `jobDetails.company`.
- Added `middleware/upload.middleware.js` (multer) to accept `logo` uploads and save them to `/uploads`.
- Updated `app.js` to serve `/uploads` statically.
- Updated `routes/auth.routes.js` to use upload middleware on `/register`.
- Updated `controllers/auth.controller.js` register flow to create User (admin), Company (if provided), Employee, and return `{ token, user, company }` after signup.
- Updated frontend `src/lib/api.js` to set `multipart/form-data` when `authAPI.register` receives a `FormData`.

Manual steps:

1. Install multer:

   cd dayflow-backend
   npm install

2. Start backend server (if not running):

   npm run dev

3. Test signup with file upload (example using curl):

   curl -X POST \
     -F "company=Acme Inc" \
     -F "name=Admin User" \
     -F "email=admin@acme.test" \
     -F "password=secret123" \
     -F "logo=@/path/to/logo.png" \
     http://localhost:5000/api/auth/register

Response should include `token`, `user` and `company` fields. The uploaded logo will be available at http://localhost:5000/uploads/<filename>

Notes:
- This simple implementation stores files on disk under `dayflow-backend/uploads` and serves them statically. For production, consider using cloud storage and stronger validation.

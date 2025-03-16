# Notes Management System

## 📌 Project Overview
This is a *full-stack Note Management System* built using *Next.js (App Router)* with an integrated *MongoDB* database using *Prisma ORM*. It allows authenticated users to create, view, edit, and delete notes specific to their accounts.

## 🏗 Tech Stack
- *Next.js (App Router)* – Server-side rendering & API routes
- *MongoDB* – Database for storing user-specific notes
- *Prisma ORM* – Database schema management & queries
- *Material-UI (MUI)* – UI components
- *SweetAlert2* – User-friendly modals for alerts & confirmations
- *React Hook Form* – Form handling 
- *NextAuth.js* – Authentication & session management

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository
bash
$ git clone https://github.com/your-repo/notes-app.git
$ cd notes-app


### 2️⃣ Install Dependencies
bash
$ npm install


### 3️⃣ Configure Environment Variables
Create a *.env.local* file in the root directory and add the required variables:
env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"


### 4️⃣ Generate Prisma Client
Since Prisma is used for database operations, generate the Prisma client before running the app:
bash
$ npx prisma generate


### 5️⃣ Run the Development Server
bash
$ npm run dev

Now, visit *http://localhost:3000* in your browser. 🚀

Use credentials:  ``` "email": "johndoe@example1.com",
                  "password": "password123" ```


---

## 📂 Project Structure
This project follows an *App Router-based structure* in Next.js.

📦 notes-app
 ┣ 📂 app
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📂 notes
 ┃ ┃ ┃ ┣ 📜 create.ts
 ┃ ┃ ┃ ┣ 📜 getAll.ts
 ┃ ┃ ┃ ┣ 📜 getSingle.ts
 ┃ ┃ ┃ ┣ 📜 edit.ts
 ┃ ┃ ┃ ┗ 📜 delete.ts
 ┃ ┣ 📂 notes
 ┃ ┃ ┣ 📜 page.tsx (All Notes Page)
 ┃ ┃ ┣ 📜 create.tsx (Create Note Page)
 ┃ ┣ 📜 layout.tsx (Main Layout)
 ┃ ┗ 📜 page.tsx (Home Page)
 ┣ 📂 components
 ┃ ┣ 📜 NoteDetails.tsx (Note Modal)
 ┃ ┣ 📜 RichTextEditor.tsx (WYSIWYG Editor)
 ┣ 📂 context
 ┃ ┣ 📜 AuthContext.tsx (Authentication Provider)
 ┣ 📂 core
 ┃ ┣ 📜 Breadcrum.tsx (Navigation Component)
 ┣ 📂 layouts
 ┃ ┣ 📜 admin.tsx (Admin Dashboard Layout)
 ┣ 📂 prisma
 ┃ ┗ 📜 schema.prisma (Database Schema)
 ┣ 📂 public (Static Assets)
 ┗ 📜 README.md (Project Documentation)


---

## 📝 Features
✅ *User Authentication:* Secure authentication using *NextAuth.js*.<br>
✅ *User-Specific Notes:* Each user can manage their own notes.<br>
✅ *Create Notes:* Users can create notes with rich text formatting.<br>
✅ *View & Edit Notes:* Inline editing & markdown support.<br>
✅ *Delete Notes:* Users can delete their own notes.<br>
✅ *Dynamic API Routes:* All operations are handled via Next.js API routes.<br>
✅ *Responsive UI:* Designed with *MUI (Material-UI)*.<br>
✅ *SweetAlert2 Integration:* Improved user experience with alerts.<br>
✅ *MongoDB & Prisma ORM:* Database interactions are smooth & efficient.<br>

---

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| *POST* | /api/notes/create | Create a new note |
| *GET* | /api/notes/getAll?subject={subject} | Fetch all notes for a subject |
| *GET* | /api/notes/getSingle?id={noteId} | Fetch a single note by ID |
| *PATCH* | /api/notes/edit?id={noteId} | Edit an existing note |
| *DELETE* | /api/notes/delete?id={noteId} | Delete a note |

---

## 🎯 Usage
### 1️⃣ Creating a Note
1. Navigate to the "Create Note" page.
2. Enter a title and write content using the *RichTextEditor*.
3. Click *"Save Note"* to store the note.

### 2️⃣ Viewing & Editing a Note
1. Click on a note from the list.
2. A modal (pop-up) will show the note details.
3. Click *"Edit"* to modify the note.
4. Save changes or cancel.

### 3️⃣ Deleting a Note
1. Click the *"Delete"* button.
2. Confirm the deletion in *SweetAlert2*.
3. The note is removed from the database & UI.

---

## 🚀 Deployment
This project can be deployed on *Vercel, **Netlify*, or any Node.js-supported platform.

1️⃣ *Build the Project:*
bash
$ npm run build

2️⃣ *Start the Production Server:*
bash
$ npm start

3️⃣ *Deploy on Vercel:*
bash
$ vercel


---

## 🙌 Contributing
Contributions are welcome! Feel free to open issues and submit pull requests. 🎉

---

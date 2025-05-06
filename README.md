# Teachers Tasks

**Kanban board for teachers and school administrators to exchange and manage tasks.**

---

## 🔧 Tech Stack

* **Next.js** – React framework for server-side rendering and routing
* **Drizzle ORM** – Type-safe database toolkit
* **shadcn/ui** – Tailwind CSS component library
* **Neon Postgres SQL** – Serverless PostgreSQL database

---

## 🚀 Features

* **Dynamic Columns**: Create custom columns (e.g., "To Do", "In Progress", "Done").
* **Task Management**:

  * Add new tasks with title, description, and assignee.
  * Move tasks between columns via drag-and-drop.
* **User Assignment**: Assign tasks to other users.
* **Persistent Storage**: All data stored in Neon PostgreSQL.

---

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/teachers-tasks.git
   cd teachers-tasks
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn install
   ```

3. **Environment variables**
   Create a `.env.local` file in the project root:

   ```env
   DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>/<DATABASE>?sslmode=require"
   ```

4. **Initialize the database**

   ```bash
   npx drizzle-kit generate --initial
   npx drizzle-kit migrate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view in your browser.

---

## 📂 Project Structure

```
├── app/
│   ├── api/             # Route handlers
│   └── components/      # UI components (shadcn/ui)
├── drizzle/             # Drizzle schema & migrations
│   ├── schema.ts
│   └── migrations/
├── lib/
│   └── db/              # Drizzle client & queries
├── public/
├── styles/
├── .env.local
├── README.md
└── package.json
```

---

## 📝 Usage

* **Add Column**: Click "+ Add Column" and provide a title/order.
* **Add Task**: Inside any column, click "+ Add Task" to open form.
* **Drag & Drop**: Move tasks between columns by dragging.
* **Assign User**: In the task form, choose an assignee from the dropdown.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

🛠️ To Do

* Fixing the editing task causing UI to freeze
* Fix editing column name text input

---

**Preview :** 

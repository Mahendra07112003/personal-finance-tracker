# 💰 Personal Finance Tracker

A responsive and user-friendly personal finance management app built with Next.js. Track your income, expenses, monthly budgets, and gain smart spending insights through interactive charts.

---

## 🚀 Features

- 📊 Visual breakdown of spending (Pie chart, Bar chart)
- 🗃️ Add, edit, and delete transactions
- 📅 Monthly budgets by category
- 🧠 Smart insights comparing actual vs. budgeted expenses
- 📱 Fully responsive for mobile and desktop
- 🧼 Clean UI with ShadCN + Tailwind CSS

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14, React 19  
- **Styling**: Tailwind CSS, ShadCN UI  
- **Database**: MongoDB with Mongoose  
- **Charts**: Recharts  
- **State Management**: React `useState` & `useEffect`

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mahendra07112003/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project:

```bash
touch .env.local
```

Paste the following content (replace with your actual MongoDB URI):

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fintrack?retryWrites=true&w=majority
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Folder Structure Overview

```
personal-finance-tracker/
├── app/
│   ├── api/               # API routes (budgets, transactions)
│   └── page.tsx           # Main page component
├── components/            # All React UI components
├── lib/                   # DB connection, models, logic
├── public/                # Static assets
├── styles/                # Global CSS (if needed)
├── .env.local             # Your MongoDB connection string
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project info and setup
```

---

## ✅ Deployment (Vercel Recommended)

1. Push your code to GitHub  
2. Go to [https://vercel.com/new](https://personal-finance-tracker-ashy-two.vercel.app/)  
3. Import your GitHub repo  
4. Add `MONGODB_URI` in Vercel Environment Variables  
5. Deploy!

---

## 🧾 License

This project is licensed under the **MIT License**.

---

## 🙋‍♂️ Author

Created by **Mahendra Makwana**  
[GitHub Profile](https://github.com/Mahendra07112003)

---

## ✅ Final Steps to Push

Paste this directly into your `README.md`, then commit and push:

```bash
git add README.md
git commit -m "Updated full project README"
git push
```

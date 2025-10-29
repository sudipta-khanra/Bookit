# BookIt: Experiences & Slots

**BookIt** is a fullstack web application that allows users to explore unique travel experiences, view slot availability, and make bookings seamlessly.
This project demonstrates an end-to-end booking flow — from browsing to checkout to confirmation — using modern web technologies.

---

## 🚀 Features

* Browse travel experiences dynamically fetched from the backend
* View detailed experience info with available slots
* Book an experience with user details and promo codes
* Responsive design (mobile + desktop)
* Real-time booking confirmation
* Fully integrated backend with database storage

---

## 🧩 Tech Stack

### Frontend

* **React** (with **TypeScript**)
* **TailwindCSS** for modern responsive design
* **React Router** for navigation
* **Fetch API / Axios** for API integration

### Backend

* **Node.js** + **Express.js**
* **MongoDB** (Mongoose ORM)
* **RESTful APIs** for experiences, bookings, and promo validation

---

## 🧠 System Flow

1. **Home Page** → Lists all experiences.
2. **Details Page** → Shows selected experience details and available slots.
3. **Checkout Page** → Collects user info, applies promo, and shows price summary.
4. **Result Page** → Displays booking confirmation or failure.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

* Node.js (v18 or above)
* npm or yarn
* MongoDB (local or cloud like MongoDB Atlas)

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/bookit.git
cd bookit
```

---

### 2️⃣ Setup the Backend

```bash
cd backend
npm install
```

#### Create a `.env` file inside the backend folder:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

#### Run the backend:

```bash
npm run dev
```

Your backend will start on `http://localhost:4000`

---

### 3️⃣ Setup the Frontend

```bash
cd frontend
npm install
```

#### Create a `.env` file inside the frontend folder:

```
VITE_API_URL=http://localhost:4000/api
```

#### Run the frontend:

```bash
npm run dev
```

Visit the app at `http://localhost:5173` (Vite default port)

---

## 🌍 Deployment

* **Frontend:** Deployed on Vercel
* **Backend:** Hosted on Render / Railway
* **Database:** MongoDB Atlas

---

## 🧪 API Endpoints

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | `/api/experiences`     | Fetch all experiences           |
| GET    | `/api/experiences/:id` | Fetch single experience details |
| POST   | `/api/bookings`        | Create a new booking            |
| POST   | `/api/promo/validate`  | Validate promo code             |

---

## 📸 Sample Data

Use royalty-free images from **Unsplash** or **Pexels** for your experiences.

---

## ✅ Deliverables

* Responsive frontend and working backend integration
* Full booking flow: *Home → Details → Checkout → Result*
* Hosted live project + GitHub repository link

---

## 👨‍💻 Author

**Sudipta Khanra**
Fullstack Developer Intern — *BookIt Project*
📧 [sudiptakhanra0612@gmail.com](mailto:sudiptakhanra@gmail.com)

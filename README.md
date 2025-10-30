# 🧳 BookIt: Experiences & Slots

**BookIt** is a fullstack web application that allows users to explore unique travel experiences, view available slots, and make seamless bookings.  
This project demonstrates an **end-to-end booking flow** — from browsing to checkout to confirmation — built with **modern web technologies**.

---

## 🎯 Task Summary

**Project Name:** BookIt: Experiences & Slots  
**Role:** Fullstack Developer Intern  
**Objective:**  
Build a complete end-to-end web application where users can explore travel experiences, select available slots, and complete bookings. The project tests both frontend and backend skills, focusing on real-world fullstack workflows, API integration, and clean UI design.

**Figma Design:**  
[🔗 View Figma Design](https://www.figma.com/design/8X6E1Ev8YdtZ3erV0Iifvb/HD-booking?node-id=0-1&p=f&t=K4scwnxfIHmfbb2a-0)

---

## 🚀 Features

- Browse travel experiences dynamically fetched from the backend  
- View detailed experience info with available slots  
- Book an experience with user details and promo codes  
- Responsive design (mobile + desktop)  
- Real-time booking confirmation  
- Fully integrated backend with database storage  

---

## 🧩 Tech Stack

### 🌐 Frontend  
- **React** (with **TypeScript**)  
- **TailwindCSS** for modern responsive design  
- **React Router** for navigation  
- **Axios / Fetch API** for API integration  

### ⚙️ Backend  
- **Node.js** + **Express.js**  
- **MongoDB** (with Mongoose ORM)  
- **RESTful APIs** for experiences, bookings, and promo validation  

---

## 🧠 System Flow

1. **Home Page** → Lists all travel experiences  
2. **Details Page** → Shows selected experience details and available slots  
3. **Checkout Page** → Collects user info, applies promo code, and shows price summary  
4. **Result Page** → Displays booking confirmation or failure message  

---

## 📐 Design Fidelity

The frontend closely follows the [Figma design](https://www.figma.com/design/8X6E1Ev8YdtZ3erV0Iifvb/HD-booking?node-id=0-1&p=f&t=K4scwnxfIHmfbb2a-0) with consistent:  
- Spacing and typography  
- Colors and layout  
- Responsive design for both desktop and mobile  
- UI states (loading, success, failure, sold-out, etc.)  

---

## ⚙️ Installation & Setup

### 🧰 Prerequisites  
Ensure you have the following installed:  
- Node.js (v18 or above)  
- npm or yarn  
- MongoDB (local or MongoDB Atlas)  

---

### 1️⃣ Clone the Repository

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

Create a `.env` file inside the **backend** folder:  

```
PORT=4000


Run the backend:  

```bash
npm run dev
```

Backend runs at → `http://localhost:4000`

---

### 3️⃣ Setup the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside the **frontend** folder:  

```
VITE_API_URL=https://bookit-backend-o6sl.onrender.com/api
```

Run the frontend:  

```bash
npm run dev
```

Visit → `https://bookit-rysm.onrender.com/`

---

## 🌍 Deployment

### Live Links  
- **Frontend:** https://bookit-rysm.onrender.com/  
- **Backend API:** https://bookit-backend-o6sl.onrender.com/api  

**Hosting:**  
- Frontend → Render  
- Backend → Render  
- Database → MongoDB Atlas  

---

## 🧪 API Endpoints

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | `/api/experiences`     | Fetch all experiences           |
| GET    | `/api/experiences/:id` | Fetch single experience details |
| POST   | `/api/bookings`        | Create a new booking            |
| POST   | `/api/promo/validate`  | Validate promo code             |

---

## 📸 Sample Data

Use royalty-free images from **Unsplash** or **Pexels** for experiences and slot visuals.  

---

## ✅ Deliverables

- Fully responsive UI matching Figma  
- Complete booking flow: *Home → Details → Checkout → Result*  
- Dynamic data integration with backend APIs  
- Hosted live app + GitHub repository  
- Clear README with setup and deployment details  

---

## 👨‍💻 Author

**Sudipta Khanra**  
Fullstack Developer Intern — *BookIt Project*  
📧 [sudiptakhanra0612@gmail.com](mailto:sudiptakhanra0612@gmail.com)

# React + TypeScript Project Architecture (Day 02)

Welcome! This repository demonstrates how to structure a clean, scalable React + TypeScript application.

---

## 📁 Directory Structure Explained (For Students)

Here is what each folder in `src/` is used for:

### 1. `src/pages/`
- **What it is:** Full page views or screens in your application.
- **Example:** `Home.tsx` (the main landing page).
- **Analogy:** Full chapters in a textbook.

### 2. `src/components/`
- **What it is:** Small, reusable UI elements that can be placed anywhere.
- **Example:** `Header.tsx`, `Footer.tsx`, buttons, or card elements.
- **Analogy:** Reusable LEGO blocks.

### 3. `src/services/`
- **What it is:** Business logic and data transformation. It processes raw data from APIs before sending it to components.
- **Example:** `studentService.ts` (calculates progress, filters active students).
- **Analogy:** A kitchen chef who Prepares and cooks raw ingredients before serving.

### 4. `src/api/`
- **What it is:** API clients, HTTP configurations (Axios/Fetch), and endpoint functions.
- **Example:** `client.ts` (fetches data from the server or backend).
- **Analogy:** A delivery person bringing food from outside.

### 5. `src/utils/`
- **What it is:** Generic helper functions used throughout the application.
- **Example:** `formatters.ts` (formats dates), `constants.ts` (stores config variables).
- **Analogy:** A multi-tool pocket knife.

### 6. `src/types/`
- **What it is:** TypeScript definitions (`interfaces`, `type` declarations).
- **Example:** `Student` model interface in `index.ts`.
- **Analogy:** A construction blueprint ensuring all parts match.

### 7. `src/hooks/`
- **What it is:** Custom React hooks that manage state and side effects cleanly outside of UI code.
- **Example:** `useStudents.ts` (manages student loading, error, and data states).

---

## 🚀 How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
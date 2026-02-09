# Author Royalty API - Multi-File Structure

REST API for managing author royalties and withdrawals - **BookLeaf Technical Assignment**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Test in browser
http://localhost:3000/authors
```

---

## 📁 Project Structure (Easy to Understand!)

```
author-royalty-api/
├── index.js                              # Main server file (start here!)
├── package.json                          # Dependencies and scripts
├── .gitignore                           # Files to ignore in Git
│
├── src/                                 # Source code folder
│   ├── data/
│   │   └── seedData.js                  # All starting data (authors, books, sales)
│   │
│   ├── controllers/
│   │   ├── authorsController.js         # Logic for author endpoints
│   │   └── withdrawalsController.js     # Logic for withdrawal endpoints
│   │
│   ├── routes/
│   │   ├── authors.js                   # Author route definitions
│   │   └── withdrawals.js               # Withdrawal route definitions
│   │
│   └── helpers.js                       # Calculation functions (earnings, balance)
```

---

## 📖 File Explanations

### **index.js** - Main Server (START HERE!)
- Sets up Express server
- Enables CORS
- Connects all routes
- Starts the server on port 3000
- **Only 70 lines!** Very clean and simple

### **src/data/seedData.js** - All Data
- Authors array
- Books array
- Sales array
- Withdrawals storage
- **This is your "database"**

### **src/helpers.js** - Business Logic
- `calculateTotalEarnings()` - Calculates author's total earnings
- `calculateCurrentBalance()` - Calculates available balance
- `getAuthorBooks()` - Gets books with sales data
- `getAuthorSales()` - Gets sales history
- **All the math happens here!**

### **src/controllers/authorsController.js** - Author Endpoints Logic
- `getAllAuthors()` - Handles GET /authors
- `getAuthorById()` - Handles GET /authors/:id
- `getAuthorSalesHistory()` - Handles GET /authors/:id/sales
- **Processes requests and sends responses**

### **src/controllers/withdrawalsController.js** - Withdrawal Logic
- `createWithdrawal()` - Handles POST /withdrawals (with all validations!)
- `getAuthorWithdrawals()` - Handles GET /authors/:id/withdrawals
- **Enforces all business rules**

### **src/routes/authors.js** - Author Routes
- Defines which URL goes to which controller function
- Example: GET /authors → calls `getAllAuthors()`

### **src/routes/withdrawals.js** - Withdrawal Routes
- Defines withdrawal-related routes
- Example: POST /withdrawals → calls `createWithdrawal()`

---

## 🎯 How It All Works Together

**When someone visits `/authors`:**

1. **index.js** receives the request
2. Routes it to **routes/authors.js**
3. Which calls **authorsController.js → getAllAuthors()**
4. Which uses **helpers.js** to calculate earnings
5. Which reads data from **seedData.js**
6. Response sent back!

**Visual Flow:**
```
Request → index.js → routes/authors.js → authorsController.js → helpers.js → seedData.js
                                                                                    ↓
Response ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
```

---

## 📡 API Endpoints

### 1. `GET /authors`
Returns all authors with earnings and balances

**Response:**
```json
[
  {
    "id": 1,
    "name": "Priya Sharma",
    "total_earnings": 3825,
    "current_balance": 3825
  }
]
```

---

### 2. `GET /authors/:id`
Returns detailed info about one author

**Example:** `GET /authors/1`

**Response:**
```json
{
  "id": 1,
  "name": "Priya Sharma",
  "email": "priya@email.com",
  "current_balance": 3825,
  "total_earnings": 3825,
  "total_books": 2,
  "books": [...]
}
```

---

### 3. `GET /authors/:id/sales`
Returns sales history for an author

**Example:** `GET /authors/1/sales`

---

### 4. `POST /withdrawals`
Creates a withdrawal request

**Request Body:**
```json
{
  "author_id": 1,
  "amount": 2000
}
```

**Validations:**
- ✅ Minimum ₹500
- ✅ Must have sufficient balance
- ✅ Author must exist

**Success Response (201):**
```json
{
  "id": 1,
  "author_id": 1,
  "amount": 2000,
  "status": "pending",
  "created_at": "2025-02-09T...",
  "new_balance": 1825
}
```

---

### 5. `GET /authors/:id/withdrawals`
Returns withdrawal history for an author

---

## 🧮 Expected Balances

- **Priya Sharma:** ₹3,825
- **Rahul Verma:** ₹9,975
- **Anita Desai:** ₹400

---

## 🛠️ Tech Stack

**Language:** JavaScript (Node.js)  
**Framework:** Express.js  
**Architecture:** MVC-like pattern (Models-Views-Controllers)  
**Storage:** In-memory arrays

**Why this structure?**
- **Separation of concerns** - Each file has ONE job
- **Easy to test** - Each function can be tested independently
- **Easy to debug** - Know exactly where to look for issues
- **Professional** - This is how real companies organize code
- **Scalable** - Easy to add new features

---

## 🌐 Deployment (Render)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/author-royalty-api.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub repo
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Free
4. Click **Create Web Service**
5. Wait 3-5 minutes

### Step 3: Test

Visit: `https://your-app.onrender.com/authors`

---

## 📝 Assumptions

- In-memory storage (data resets on server restart)
- No authentication required
- CORS enabled for all origins
- Withdrawals created with "pending" status

---

## ⏱️ Time Spent

Approximately 4 hours total

---

## 🔍 Why Multiple Files is Better

### **Single File** (400+ lines)
❌ Hard to navigate  
❌ Everything mixed together  
❌ Difficult to debug  
❌ Scary for beginners  

### **Multiple Files** (50-150 lines each)
✅ Easy to find things  
✅ Each file has clear purpose  
✅ Easy to debug - know where to look  
✅ Professional structure  
✅ **Much easier for evaluators to read!**

---

## 💡 For Evaluators

This structure makes it easy to check:

**Want to see the data?** → `src/data/seedData.js`  
**Want to see calculations?** → `src/helpers.js`  
**Want to see validations?** → `src/controllers/withdrawalsController.js`  
**Want to see endpoints?** → `src/routes/`  
**Want to run it?** → `index.js`

Everything is organized and well-commented!

---

## 📞 Support

If you encounter issues:
1. Check `index.js` is in root folder
2. Run `npm install` to ensure dependencies are installed
3. Verify port 3000 is available
4. Check terminal for error messages

---


**Built with ❤️ for BookLeaf Technical Assignment**
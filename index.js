const express = require('express');
const cors = require('cors');
const authorsRoutes = require('./src/routes/authors');
const withdrawalsRoutes = require('./src/routes/withdrawals');
const { calculateTotalEarnings } = require('./src/helpers');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    message: "🎉 Author Royalty API is running!",
    endpoints: [
      "GET /authors",
      "GET /authors/:id",
      "GET /authors/:id/sales",
      "POST /withdrawals",
      "GET /authors/:id/withdrawals"
    ],
    tip: "Try visiting /authors to see all authors!"
  });
});

// Mount route handlers
app.use('/authors', authorsRoutes)
app.use('/withdrawals', withdrawalsRoutes)

// app.listen(PORT, () => {
//   console.log('========================================');
//   console.log('✅ Server is running!');
//   console.log(`📍 URL: http://localhost:${PORT}`);
//   console.log('========================================');
//   console.log('');
//   console.log('🧪 Quick test: Open your browser and visit:');
//   console.log(`   http://localhost:${PORT}/authors`);
//   console.log('');
//   console.log('📊 Expected author balances:');
//   console.log(`   Priya Sharma: ₹${calculateTotalEarnings(1)}`);
//   console.log(`   Rahul Verma: ₹${calculateTotalEarnings(2)}`);
//   console.log(`   Anita Desai: ₹${calculateTotalEarnings(3)}`);
//   console.log('');
//   console.log('❌ To stop the server: Press Ctrl+C');
//   console.log('========================================');
// });
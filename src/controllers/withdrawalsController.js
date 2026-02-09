const { authors, withdrawals, incrementWithdrawalId } = require('../data/givenData');
const { calculateCurrentBalance } = require('../helpers');

function createWithdrawal(req, res) {
  const { author_id, amount } = req.body;

  const author = authors.find(a => a.id === author_id);
  if (!author) {
    return res.status(404).json({
      error: "Author not found"
    })
  }

  if (amount < 500) {
    return res.status(400).json({
      error: "Minimum withdrawal amount is ₹500"
    })
  }

  const currentBalance = calculateCurrentBalance(author_id);
  if (amount > currentBalance) {
    return res.status(400).json({
      error: "Insufficient balance",
      current_balance: currentBalance,
      requested_amount: amount
    });
  }


  const withdrawal = {
    id: incrementWithdrawalId(),
    author_id: author_id,
    amount: amount,
    status: "pending",
    created_at: new Date().toISOString()
  }
  withdrawals.push(withdrawal)


  const newBalance = calculateCurrentBalance(author_id);
  res.status(201).json({
    id: withdrawal.id,
    author_id: withdrawal.author_id,
    amount: withdrawal.amount,
    status: withdrawal.status,
    created_at: withdrawal.created_at,
    new_balance: newBalance
  });
}


function getAuthorWithdrawals(req, res) {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);
  if (!author) {
    return res.status(404).json({
      error: "Author not found"
    });
  }

  const authorWithdrawals = withdrawals
    .filter(w => w.author_id === authorId)
    // Sort by date (newest first)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map(w => ({
      id: w.id,
      amount: w.amount,
      status: w.status,
      created_at: w.created_at
    }));

  res.json(authorWithdrawals);
}

module.exports = {
  createWithdrawal,
  getAuthorWithdrawals
};
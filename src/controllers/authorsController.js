const { authors } = require('../data/givenData');
const {
  calculateTotalEarnings,
  calculateCurrentBalance,
  getAuthorBooks,
  getAuthorSales
} = require('../helpers');

function getAllAuthors(req, res) {
  const response = authors.map(author => ({
    id: author.id,
    name: author.name,
    total_earnings: calculateTotalEarnings(author.id),
    current_balance: calculateCurrentBalance(author.id)
  }));

  res.json(response);
}

function getAuthorById(req, res) {
  const authorId = parseInt(req.params.id)
  const author = authors.find(a => a.id === authorId)
  if (!author) {
    return res.status(404).json({
      error: "Author not found"
    });
  }
  const authorBooks = getAuthorBooks(authorId);

  const response = {
    id: author.id,
    name: author.name,
    email: author.email,
    current_balance: calculateCurrentBalance(authorId),
    total_earnings: calculateTotalEarnings(authorId),
    total_books: authorBooks.length,
    books: authorBooks
  };

  res.json(response)
}


function getAuthorSalesHistory(req, res) {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);
  if (!author) {
    return res.status(404).json({
      error: "Author not found"
    });
  }

  const salesData = getAuthorSales(authorId)

  res.json(salesData);
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  getAuthorSalesHistory
};
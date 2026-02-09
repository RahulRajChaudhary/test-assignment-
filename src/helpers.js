const { authors, books, sales, withdrawals } = require('./data/givenData');

function calculateTotalEarnings(authorId) {
  const authorBooks = books.filter(book => book.author_id === authorId);

  let totalEarnings = 0;

  // For each book, calculate earnings from sales
  for (let book of authorBooks) {
    const bookSales = sales.filter(sale => sale.book_id === book.id);

    let totalQuantitySold = 0;
    for (let sale of bookSales) {
      totalQuantitySold += sale.quantity;
    }


    const bookEarnings = totalQuantitySold * book.royalty_per_sale;
    totalEarnings += bookEarnings;
  }

  return totalEarnings;
}


function calculateCurrentBalance(authorId) {
  const totalEarnings = calculateTotalEarnings(authorId);

  const authorWithdrawals = withdrawals.filter(w => w.author_id === authorId);

  let totalWithdrawn = 0;
  for (let withdrawal of authorWithdrawals) {
    totalWithdrawn += withdrawal.amount;
  }

  return totalEarnings - totalWithdrawn;
}

function getAuthorBooks(authorId) {
  const authorBooks = books.filter(book => book.author_id === authorId);

  return authorBooks.map(book => {
    const bookSales = sales.filter(sale => sale.book_id === book.id);

    let totalSold = 0;
    for (let sale of bookSales) {
      totalSold += sale.quantity;
    }

    const totalRoyalty = totalSold * book.royalty_per_sale;

    return {
      id: book.id,
      title: book.title,
      royalty_per_sale: book.royalty_per_sale,
      total_sold: totalSold,
      total_royalty: totalRoyalty
    };
  });
}

function getAuthorSales(authorId) {

  const authorBooks = books.filter(book => book.author_id === authorId);
  const authorBookIds = authorBooks.map(book => book.id);

  const authorSales = sales
    .filter(sale => authorBookIds.includes(sale.book_id))
    .map(sale => {
      const book = books.find(b => b.id === sale.book_id);

      return {
        book_title: book.title,
        quantity: sale.quantity,
        royalty_earned: sale.quantity * book.royalty_per_sale,
        sale_date: sale.sale_date
      };
    })
    .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));

  return authorSales;
}

module.exports = {
  calculateTotalEarnings,
  calculateCurrentBalance,
  getAuthorBooks,
  getAuthorSales
};
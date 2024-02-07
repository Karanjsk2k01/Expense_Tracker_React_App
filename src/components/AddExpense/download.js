import jsPDF from 'jspdf';
import 'jspdf-autotable';  // Import the autoTable plugin for jsPDF
import autoTable from 'jspdf-autotable';

const downloadExpensesAsPDF = (expenses) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Set up the header row
  const header = ['Expense', 'Amount', 'Category'];


  // Add the header and data to the PDF
  doc.text('Expenses', 15, 10);

  // Prepare data for the PDF table
  const data = expenses.map(expense => [expense.name, expense.amount, expense.category]);

  autoTable(doc, {
    head: [header],
    body:
      data.map((item) => {
        return [...item]
      })
    ,
  })
  // Save the PDF
  doc.save('expenses.pdf');
};

export default downloadExpensesAsPDF;

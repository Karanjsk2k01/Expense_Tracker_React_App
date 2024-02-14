import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

const downloadExpensesAsPDF = (expenses) => {
  const doc = new jsPDF();

  const header = ['Expense', 'Amount', 'Category'];

  doc.text('Expenses', 15, 10);

  const data = expenses.map(expense => [expense.name, expense.amount, expense.category]);

  autoTable(doc, {
    head: [header],
    body:
      data.map((item) => {
        return [...item]
      })
    ,
  })

  doc.save('expenses.pdf');
};

export default downloadExpensesAsPDF; 
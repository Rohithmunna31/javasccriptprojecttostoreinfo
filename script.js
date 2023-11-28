function saveExpense() {
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
  
    // Create a new expense object
    const newExpense = {
      id: Date.now(), // Unique ID for each expense
      amount: amount,
      category: category,
      description: description
    };
  
    // Get existing expenses from local storage or initialize as an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Add the new expense to the expenses array
    expenses.push(newExpense);
  
    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Display the updated list of expenses
    displayExpenses();
  }
  
  
  function displayExpenses() {
    const expenseListDiv = document.getElementById('expenseList');
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Clear previous content
    expenseListDiv.innerHTML = '';
  
    if (expenses.length === 0) {
      expenseListDiv.innerHTML = '<p>No expenses added yet.</p>';
    } else {
      const ul = document.createElement('ul');
      expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
          Amount: $${expense.amount} | Category: ${expense.category} | Description: ${expense.description}
          <button onclick="editExpense(${expense.id})">Edit</button>
          <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        ul.appendChild(li);
      });
      expenseListDiv.appendChild(ul);
    }
  }
  
 
  function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Filter out the expense with the provided ID
    expenses = expenses.filter(expense => expense.id !== id);
  
    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Display the updated list of expenses
    displayExpenses();
  }
  
  // Function to edit a specific expense
  function editExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Find the expense with the provided ID
    const expenseToEdit = expenses.find(expense => expense.id === id);
  
    if (expenseToEdit) {
      // Assuming you have form fields for editing and you want to populate them with the existing data
      document.getElementById('expenseAmount').value = expenseToEdit.amount;
      document.getElementById('expenseCategory').value = expenseToEdit.category;
      document.getElementById('expenseDescription').value = expenseToEdit.description;
  
      // After editing, delete the existing entry
      expenses = expenses.filter(expense => expense.id !== id);
  
      // Save the updated expenses array to local storage
      localStorage.setItem('expenses', JSON.stringify(expenses));
  
      // Display the updated list of expenses
      displayExpenses();
    }
  }
  
  // Display existing expenses on page load
  displayExpenses();
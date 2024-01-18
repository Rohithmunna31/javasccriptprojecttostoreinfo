function saveExpense() {
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
  
    // Create a new expense object
    // const newExpense = {
    //   id: Date.now(), // Unique ID for each expense
    //   amount: amount,
    //   category: category,
    //   description: description
    // };
  
    // Get existing expenses from local storage or initialize as an empty array
    axios
    .post("http://localhost:3000/expense/addexpense", {
      ExpenseAmount:amount,
      Expensecategory:category,
      Expensedescription:description
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  
    // Add the new expense to the expenses array
  
    // Display the updated list of expenses
    displayExpenses();
  }
  
  
  function displayExpenses() {
    
    axios
    .get("http://localhost:3000/expense/get-expense")
    .then((res) => {
      console.log(res);

      for (let i = 0; i < res.data.allExpense.length; i++) {
        showUser(res.data.allExpense[i]);

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
    })
    .catch((err) => {
      console.log(err);
    });

  
    
  }
  
 
  function deleteExpense(id) {
    
    axios.delete('http://localhost:3000/expense/delete-expense/{id}')
    .then((res)=>{
      removeuserfromscreen(id);
    })
    .catch((err)=>{
      console.log(err);
    })

    // Display the updated list of expenses
    displayExpenses();
  }
  
  // Display existing expenses on page load
  displayExpenses();
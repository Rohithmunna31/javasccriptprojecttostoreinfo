const express = require("express");

// const path = require("path");

const sequelize = require("./model/data");

const bodyParser = require("body-parser");

const adminController = require("./routes/admin");

const Expense = require("./model/data");

const app = express();

const cors = require("cors");
const { UUID } = require("sequelize");

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use("/expense", adminController);

app.post("expense/addexpense", async (req, res, next) => {

  try{
  const ExpenseAmount = req.body.ExpenseAmount;
  const ExpenseCategory = req.body.ExpenseCategory;
  const ExpenseDescription = req.body.ExpenseDescription;

  const data = await Expense.create({
    ExpenseAmount:ExpenseAmount,
    ExpenseCategory:ExpenseCategory,
    ExpenseDescription:ExpenseDescription
  });
  res.status(201).json({ newExpenseDetails: data });
}
catch(err){
  res.status(500).json({
    error:err
  })
}
});

app.get('expense/get-expense',async (req,res,next)=>{
  try{
  const expenses  = Expense.findAll();
  res.status(200).json({allexpenses:expenses});
  }
  catch(err){
      res.status(500).json({error:err});
  }
})

app.delete('expense/delete-expense/:id',async (req,res)=>{
    try{
      if(req.params.id == undefined){
        console.log('id is missing');
        res.status(500).json({error: 'id is missing'});
      }
    }catch(err){
      res.status(500).json({error:err});
    }
    const id = req.params.id;

    await Expense.destroy({where: {id:id}});
    res.sendStatus(200);

})

sequelize
  .sync()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(3000);
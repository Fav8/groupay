const router = require('express').Router()
const groupscontroller = require('./controllers/groups.controller')
const userscontroller  = require('./controllers/users.controller')

router.get('/expenses', groupscontroller.getExpenses)
router.post('/expenses', groupscontroller.createExpense)
router.post('/groups', groupscontroller.createGroup)
//router.put('/:group/expenses', expensescontroller.updateExpense)
router.delete('/expenses', groupscontroller.deleteExpense)
router.get('/groups', userscontroller.getGroups)
router.post('/register', userscontroller.createUser)
router.put('/join', userscontroller.joinGroup)


module.exports = router
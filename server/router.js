const router = require('express').Router()
const groupscontroller = require('./controllers/groups.controller')
const userscontroller  = require('./controllers/users.controller')

router.get('/expenses', groupscontroller.getExpenses)
router.post('/expenses', groupscontroller.createExpense)
router.post('/groups', groupscontroller.createGroup)
router.delete('/expenses', groupscontroller.deleteExpense)
router.get('/groups', userscontroller.getGroups)
router.get('/group', groupscontroller.getGroup)
router.get('/user', userscontroller.getUser)
router.post('/register', userscontroller.createUser)
router.put('/join', userscontroller.joinGroup)



module.exports = router

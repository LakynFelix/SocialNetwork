const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/thought-controller');

router
.get('/',getAllUsers)
.post(createUser);

router
.get('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);   

router
.get('/:id/friends/friendsId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
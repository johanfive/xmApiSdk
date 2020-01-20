const deleteUsers = (numOfUsers, suffix) => {
  var usersToDelete = [];
  for (let i = 1; i <= numOfUsers; i++) {
    const targetName = `${suffix}-Tn${i}`;
    usersToDelete.push(targetName);
  }
  return usersToDelete;
};

module.exports = deleteUsers;

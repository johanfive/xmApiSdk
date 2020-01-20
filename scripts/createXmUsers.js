const createUsers = (numOfUsers, suffix) => {
  const users = [];
  for (let i = 1; i <= numOfUsers; i++) {
    const user = {
    "firstName": `${suffix}-Fn${i}`,
    "lastName": `${suffix}-Ln${i}`,
    "roles": ["Standard User"],
    "targetName": `${suffix}-Tn${i}`
    };
    users.push(user);
  }
  return users;
};

module.exports = createUsers;

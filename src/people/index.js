var getAll = function () {
  return {
    method: 'get',
    path: 'people'
  };
};

var getByIdOrTargetName = function () {
  return {
    method: 'get',
    path: 'people/byIdOrTargetName'
  };
};

var add = function () {
  return {
    method: 'post',
    path: 'people/add'
  };
};

var edit = function () {
  return {
    method: 'post',
    path: 'people/edit'
  };
};

var deletePerson = function () {
  return {
    method: 'post',
    path: 'people/delete'
  };
};

module.exports = {
  getAll: getAll,
  getByIdOrTargetName: getByIdOrTargetName,
  add: add,
  edit: edit,
  deletePerson: deletePerson
};
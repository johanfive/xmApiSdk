var getAll = function () {
  return {
    method: 'get',
    path: 'groups'
  };
};

var getByIdOrTargetName = function () {
  return {
    method: 'get',
    path: 'groups/byIdOrTargetName'
  };
};

var add = function () {
  return {
    method: 'post',
    path: 'groups/add'
  };
};

var edit = function () {
  return {
    method: 'post',
    path: 'groups/edit'
  };
};

var deleteGroup = function () {
  return {
    method: 'post',
    path: 'groups/delete'
  };
};

module.exports = {
  getAll: getAll,
  getByIdOrTargetName: getByIdOrTargetName,
  add: add,
  edit: edit,
  deleteGroup: deleteGroup
};
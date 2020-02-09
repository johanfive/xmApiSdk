function XmSdkError(message) {
  this.message = message;
  this.name = this.constructor.name;
  Error.captureStackTrace(this, this.constructor);
}
XmSdkError.prototype = Object.create(Error.prototype);
XmSdkError.prototype.constructor = XmSdkError;

module.exports = XmSdkError;

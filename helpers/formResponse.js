const fromResponse = (message, status, result) => {
  return result !== null
    ? {
      message: message,
      status: status,
      data: result,
    }
    : {
      message: message,
      status: status,
    };
};

module.exports = fromResponse;

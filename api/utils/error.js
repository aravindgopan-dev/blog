const errorHandler = (statusCode, message) => {
    const error = new Error(message); // Directly set the message in the Error constructor
    error.statusCode = statusCode;
    return error;
};


export default errorHandler;
const responseMessage = {};

responseMessage.email_exists = {
    code: 'ERR_EMAIL_EXISTS',
    message: 'User already exists with this email address.'
};

responseMessage.email_not_exists = {
    code: 'SUC_EMAIL_EXISTS',
    message: 'User does not exist with this email address.'
};

responseMessage.insert_user = {
    code: 'SUC_INSERT_USER',
    message: 'Sign up successfully.'
};

responseMessage.exists_user = {
    code: 'ERR_USER_EXISTS',
    message: 'Sign up failed.'
};
responseMessage.get_taskType_err = {
    code: 'ERR_GET_TASKTYPE',
    message: 'Get all taskTypes failed.'
}
responseMessage.del_task_err = {
    code: 'ERR_DELETE_TASK',
    message: 'Delete task failed'
}

responseMessage.file_too_large = {
    code: 'ERR_FILE_TOO_LARGE',
    message: 'File is too large.'
};

responseMessage.upload_failed = {
    code: 'ERR_UPLOAD_FAILED',
    message: 'Upload failed. Please try again later.'
};
responseMessage.wrong_extension = {
    code: 'ERR_WRONG_EXTENSION',
    message: 'The file your provided is not accepted. Please choose a different format.'
};

module.exports = responseMessage;
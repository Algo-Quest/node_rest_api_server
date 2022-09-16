
const HttpResponseMsg = (msg, status, data = null) => {
    return {
        status: status,
        msg: msg,
        data
    }
}

export default HttpResponseMsg;

interface HttpError<T = unknown> extends Error {
    statusCode: number;
    data: T;
}

export default HttpError;

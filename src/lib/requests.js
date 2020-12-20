import axios from 'axios';

export const getCall = async (url, opts) => {
    try {
        const res = await axios.get(url, opts);
        console.log('[getcall]', res)
        return ({
            success: true,
            message: 'Success',
            data: res.data.res,
            status: res.status
        })

    } catch (err) {
        const msg = err.response ? err.response.data.message : err.message;
        const code = err.response ? err.response.status : 400;
        return ({
            success: false,
            message: msg,
            data: null,
            status: code
        })
    }
}

export const postCall = async (url, payload, opts) => {
    try {
        const res = await axios.post(url, payload, opts);
        return ({
            success: true,
            message: 'Success',
            data: res.data.res,
            status: res.status
        })

    } catch (err) {
        const msg = err.response ? err.response.data.message : err.message;
        const code = err.response ? err.response.status : 400;
        return ({
            success: false,
            message: msg,
            data: null,
            status: code
        })
    }
}
export const putCall = async (url, payload, opts) => {
    try {
        const res = await axios.put(url, payload, opts);
        return ({
            success: true,
            message: 'Success',
            data: res.data.res,
            status: res.status
        })

    } catch (err) {
        const msg = err.response ? err.response.data.message : err.message;
        const code = err.response ? err.response.status : 400;
        return ({
            success: false,
            message: msg,
            data: null,
            status: code
        })
    }
}

export const multiCall = async (urls, opts) => {
    const calls = urls.map(url => (axios.get(url, opts)));
    return Promise.all(calls.map(reflect)).then(res => (res));
}

export const multiPostCall = async (urls, opts) => {
    const calls = urls.map(url => (axios.post(url.url, url.payload, url.opts)));
    return Promise.all(calls.map(reflect)).then(res => (res));
}

function reflect(promise) {
    return promise.then(
        (v) => {
            return ({ status: true, value: v.data })
        },
        (err) => {
            return ({ status: false, reason: err })
        }
    )
}
const openApiUrl = 'http://localhost:9000/';

export const post = async (data = []) => {
    let headers = {
        'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {
        fetch(
            openApiUrl+data.url,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data.body)
            }).then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((e) => {
                reject(e)
            });
    })
}

export const get = async (data = []) => {
    let headers = {
        'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {
        fetch(
            openApiUrl+data.url,
            {
                method: 'GET',
                headers: headers
            }).then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((e) => {
                reject(e)
            });
    })
}
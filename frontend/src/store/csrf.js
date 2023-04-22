
const csrfFetch = async (url,options={})=> {
    options.headers ||= {};
    options.method = options.method || 'GET';
    if (options.method.toUpperCase() !== 'GET'){
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    options.headers['Content-Type'] ||= 'application/json';
    };
    const res = await fetch(url,options);
    if(res.status >= 400){
        throw res
    }else{
        return res
    }
};

export default csrfFetch;

export const restoreCSRF = async ()=> {
    let res = await csrfFetch("api/session");
    storeCSRFToken(res);
    return res;
};

export const storeCSRFToken = (response) =>{
    const csrfToken = response.headers.get('X-CSRF-Token')
    if(csrfToken){
        sessionStorage.setItem('X-CSRF-Token', csrfToken);
    }
}

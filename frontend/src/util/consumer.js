import {createConsumer} from '@rails/actioncable'


let url = "ws://localhost:5000/cable"
if (process.env.NODE_ENV === 'production'){
    url = process.env.REDIS_URL;
}
const consumer = createConsumer(url)

export default consumer;


export const dateFormat = (date)=>{
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let time = date.substring(12,16);
    return `${month}/${day}/${year} ${time}`
}
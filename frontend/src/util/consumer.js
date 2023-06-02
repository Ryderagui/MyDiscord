import {createConsumer} from '@rails/actioncable'


let url = "ws://localhost:5000/cable"
if (process.env.NODE_ENV === 'production'){
    console.log("In Production")
    url = "redis://red-ch9fi0u7avjakq72fd70:6379";
}
console.log(process.env.REDIS_URL,"Redis URL")
console.log(url,"url")
const consumer = createConsumer(url)
console.log(consumer,"Consumer")
export default consumer;


export const dateFormat = (date)=>{
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let time = date.substring(12,16);
    return `${month}/${day}/${year} ${time}`
}
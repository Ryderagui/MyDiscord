import {createConsumer} from '@rails/actioncable'


const url = "ws://localhost:5000/cable"
const consumer = createConsumer(url)

export default consumer;


export const dateFormat = (date)=>{
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let time = date.substring(12,17);
    return `${month}/${day}/${year} ${time}`
}
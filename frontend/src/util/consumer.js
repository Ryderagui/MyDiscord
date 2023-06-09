import {createConsumer} from '@rails/actioncable'
import * as ActionCable from '@rails/actioncable'

// ActionCable.logger.enabled = true;
const consumer = createConsumer('/cable')
export default consumer;


export const dateFormat = (date)=>{
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let time = date.substring(12,16);
    return `${month}/${day}/${year} ${time}`
}
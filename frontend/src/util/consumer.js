import {createConsumer} from '@rails/actioncable'


const url = "ws://localhost:5000/cable"
const consumer = createConsumer(url)

export default consumer;
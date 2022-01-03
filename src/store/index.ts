import { createStore } from 'redux'

import reducer from './reducer'

//创建store 
const store = createStore(reducer)
export default store 
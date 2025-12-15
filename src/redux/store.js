// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import purchaseSubscriptionReducer from "./slices/purchaseSubscriptionSlice";
import companyReducer from './slices/companySlice';
import clientMessagesReducer from './slices/clientMessagesSlice';

import floorReducer from './slices/floorSlice';
import employeeReducer from './slices/employeeSlice' ;
import resourceReducer from './slices/resourceSlice';
import compSubReducer from './slices/companySubSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription:subscriptionReducer,
    purchase:purchaseSubscriptionReducer,
    company:companyReducer,
    clientMessages:clientMessagesReducer,

    floor: floorReducer,
    employees: employeeReducer,
    resources: resourceReducer,
    compSub: compSubReducer,
  },
});

console.log("🟢 [STORE] Redux store initialized:", store.getState());

export default store;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js"
import adminReducer from "./admin/adminSlice.js"
import manageuserReducer from "./admin/manageuserSlice.js"
import profileReducer from "./user/profileSlice.js"

const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        manageUsers:manageuserReducer,
         userprofile: profileReducer

    }
})

export default store
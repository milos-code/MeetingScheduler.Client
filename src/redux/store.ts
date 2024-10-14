import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { combineReducers } from 'redux';
import userReducer from "./userSlice";
import employeesReducer from "./employeesSlice";
import meetingRoomReducer from "./meetingRoomSlice";
import meetingSchedulerReducer from "./meetingSchedulerSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  employees: employeesReducer,
  meetingRoom: meetingRoomReducer,
  meetingScheduler: meetingSchedulerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer:
    persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;

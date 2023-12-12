import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import bikeReducer from '../features/bikes/bikeSlice';
import reviewReducer from '../features/review/reviewSlice';
import adminReducer from '../features/admin/adminSlice';
import reservationReducer from '../features/reservation/reservationSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    bike: bikeReducer,
    review: reviewReducer,
    reservation: reservationReducer,
    admin: adminReducer,
  },
});

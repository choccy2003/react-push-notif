import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    permission: Notification.permission,
    notifications: [],
  },
  reducers: {
    updatePermission: (state, action) => {
      state.permission = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    
  },
});
console.log(notificationsSlice)

export const { updatePermission, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
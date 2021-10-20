import {createSlice} from '@reduxjs/toolkit'; //

export const modalSlice = createSlice({
  modal: null,
  name: 'modal',
  initialState: {modalVisible: false},

  reducers: {
    setModalHidden: (state, action) => {
      state.modalVisible = false;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = true;
    },
  },
});

export const {setModalHidden, setModalVisible} = modalSlice.actions;

export const selectModalVisible = state => state.modal.modalVisible;

export default modalSlice.reducer;

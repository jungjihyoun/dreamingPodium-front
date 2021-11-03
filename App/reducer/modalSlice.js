import {createSlice} from '@reduxjs/toolkit'; //

export const modalSlice = createSlice({
  modal: null,
  name: 'modal',

  initialState: {modalVisible: false, modalInner: '', modalDrawY: true},

  reducers: {
    setModalHidden: (state, action) => {
      state.modalVisible = false;
    },
    setModalVisible: (state, action) => {
      state.modalDrawY = action.payload.swipeY;
      console.log('test', action.payload.swipeY);
      state.modalVisible = true;
    },
    setModalInner: (state, action) => {
      state.modalInner = action.payload.modalInner;
    },
  },
});

export const {setModalHidden, setModalVisible, setModalInner} =
  modalSlice.actions;

export const selectModalVisible = state => state.modal.modalVisible;

export const selectModalInner = state => state.modal.modalInner;

export const selectModalDrawY = state => state.modal.modalDrawY;

export default modalSlice.reducer;

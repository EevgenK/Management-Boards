import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpenModal: false,
    type: '',
    isVisible: false,
    properties: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpenModal = true;
      state.type = action.payload?.type;
      state.properties = action.payload?.properties;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
      state.type = '';
    },
    onModalVisible: (state) => {
      state.isVisible = true;
    },
    offModalVisible: (state) => {
      state.isVisible = false;
    },
  },
});

export const { openModal, closeModal, onModalVisible, offModalVisible } =
  modalSlice.actions;
export default modalSlice.reducer;

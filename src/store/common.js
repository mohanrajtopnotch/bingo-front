import create from "zustand";

const store = {
  registerResponseData: "",
};

const [useCommonAppStore, useCommonAppApi] = create((setState, getState) => ({
  ...store,
  updateRegisterResponseData: (registerResponseData) => {
    setState((state) => ({
      registerResponseData: registerResponseData,
    }));
  }
}));

export { useCommonAppStore, useCommonAppApi };

import create from "zustand";

const store = {
  cartCount: 0,
};

const [useCommonAppStore, useCommonAppApi] = create((setState, getState) => ({
  ...store,
  updateCartCount: (responseData) => {
    setState((state) => ({
      cartCount: responseData,
    }));
  },
}));

export { useCommonAppStore, useCommonAppApi };

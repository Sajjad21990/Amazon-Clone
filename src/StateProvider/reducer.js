export const initialState = {
  cart: [],
  user: null,
  userDetails: {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  },
  cartTotal: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: { uid: action.item.uid, email: action.item.email },
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        userDetails: {
          name: action.item.name,
          address: action.item.address,
          city: action.item.city,
          state: action.item.state,
          pincode: action.item.pincode,
          phone: action.item.phone,
        },
      };

    case "CART_TOTAL":
      return {
        ...state,
        cartTotal: action.total,
      };

    default:
      return state;
  }
};
export default reducer;

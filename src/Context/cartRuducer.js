function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        ...state,
        {
          ...action.payload,
          quantity: 1,
        },
      ];

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => item.id !== action.payload
      );

    case "UPDATE_QUANTITY":
      return state.map((item) => {
        if (item.id !== action.payload.productId) {
          return item;
        }

        if (action.payload.type === "increase") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        if (
          action.payload.type === "decrease" &&
          item.quantity > 1
        ) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });

    default:
      return state;
  }
}

export default cartReducer;
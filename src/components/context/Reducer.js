
// reducer function
export const Reducer = (state, action) => {

    const cartArray = JSON.parse(localStorage.getItem('cartArray'));

    switch (action.type) {
        case "add to cart":
            return {
                ...state,
                cart: [...state?.cart, { ...action.payload }],
            }

        case "remove from cart":
            return { ...state, cart: state?.cart.filter((item) => item.productId !== action.payload._id) }

        case "remove from myCart":
            return { ...state, cart: state?.cart.filter((item) => item.productId !== action.payload.productId) }

        case "change quantity":
            return  { ...state, cart: state?.cart.filter((item) => item.productId === action.payload.productId ? (item.quantity = action.payload.quantity) : item.quantity) }// , console.log(state.cart , 'reducer quantity cart');

        case "data":
            return { ...state, products: [...action.payload] }

        case "setCart":
            return {  cart: [...cartArray] }
                    
        case "resetCart":
            return {cart:[]}

        default:
            return state;
    };

}



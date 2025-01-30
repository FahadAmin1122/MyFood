import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();//this is for to show card state
const CartDispatchContext = createContext();//this is for to perform any operation

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        // case "REMOVE":
        //     let newArr = [...state]
        //     console.log(newArr[0].qty);
        //     if (newArr[0].qty === 1) {
        //         let newArr = []
        //         return newArr
        //     }
        //     else {

        //         return newArr;
        //     }
        //     // newArr.splice(action.index, 1)

        case "REMOVE":
            let newArr = [...state];
            let index = action.index;
            console.log(index,'index');

            if (index !== -1) {
                let item = newArr[index];

                // Calculate the price of a single unit
                let pricePerUnit = item.price / item.qty;

                if (item.qty === 1) {
                    // Remove the item if qty is 1
                    newArr.splice(index, 1);
                } else {
                    // Decrease qty and update the price
                    newArr[index] = {
                        ...item,
                        qty: item.qty - 1,
                        price: item.price - pricePerUnit
                    };
                }
            }

            return newArr;

           
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in Reducer");
    }
};

export const CartProviders = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
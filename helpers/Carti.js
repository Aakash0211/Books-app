import Cart from "../models/Cart"
export const addItemToCart = (cartItems, cartItemToAdd) => {
    //find(condition) finds the first item in the array based on the condition.
    
    const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.book.id);
    if (existingCartItem ) {
      //in order for change detection to trigger we have to rerender
      //otherwise our quantity property will not be updated
      //map will return a new array 
      //we need to return new versions of our state so that our component know to re render
      //here we update the quantity property
      return cartItems.map(item =>
        item.id === cartItemToAdd.book.id
          ? {...item, quantity: item.quantity + 1 }
          : item
      );
    }
  
    const newCart=new Cart(cartItemToAdd.book.id,cartItemToAdd.userId,cartItemToAdd.book.volumeInfo.title,cartItemToAdd.book.volumeInfo.authors,cartItemToAdd.book.volumeInfo.language,1)
    //when you first time add a new item, sine exixtingCartItem will be falsy, it will pass the first if block and will come here
    //quantity property gets attached the first time around since this if block wont run when it is a new item.
   //in the beginning cartItems array is empty. every time you add a new item to this array, it will add "quantity:1" to this item object.  
    return [...cartItems, newCart];
  
};

export const removeItemFromCart = (cartItems, id) => {
  //find(condition) finds the first item in the array based on the condition.
  
  const existingCartItem = cartItems.find(item => item.id === id);
  if (existingCartItem && existingCartItem.quantity>1 ) {
    //in order for change detection to trigger we have to rerender
    //otherwise our quantity property will not be updated
    //map will return a new array 
    //we need to return new versions of our state so that our component know to re render
    //here we update the quantity property
    return cartItems.map(item =>
      item.id === id
        ? {...item, quantity: item.quantity - 1 }
        : item
    );
  }

  const newCart=cartItems.filter(item=>item.id!==id)
  //when you first time add a new item, sine exixtingCartItem will be falsy, it will pass the first if block and will come here
  //quantity property gets attached the first time around since this if block wont run when it is a new item.
 //in the beginning cartItems array is empty. every time you add a new item to this array, it will add "quantity:1" to this item object.  
  return  newCart;

};
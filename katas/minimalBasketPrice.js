function minimalBasketPrice(
      maxPrice,
    vendorsDelivery,
    vendorsProducts
){
  
  return
}

test('happy', () => {
      const maxPrice = 7
    const vendorsDelivery = [5, 4, 2, 3]
    const vendorsProducts = [[1,1,1], 
 [3,-1,3], 
 [-1,2,2], 
 [5,-1,-1]]
  const result = minimalBasketPrice(
        maxPrice,
    vendorsDelivery,
    vendorsProducts
  )

  const expected = [1, 2]    
  expect(result).toEqual(expected)
})


/*

  Inputs:

  {"maxPrice":"6","vendorsDelivery":"[1, 5, 10, 12]","vendorsProducts":"[[-1,-1,-1], \n [3,-1,-1], \n [-1,2,-1], \n [-1,-1,1]]"}

  Expected: 
  
  "[1, 2, 3]"
===
Inputs:

  {"maxPrice":"5","vendorsDelivery":"[5, 6]","vendorsProducts":"[[5], \n [6]]"}

  Expected: 
  
  "[0]"
===
Inputs:

  {"maxPrice":"1000000","vendorsDelivery":"[1000000]","vendorsProducts":"[[1000000]]"}

  Expected: 
  
  "[0]"
===
Inputs:

  {"maxPrice":"6","vendorsDelivery":"[100, 5, 10, 12]","vendorsProducts":"[[3,4,4], \n [4,4,4], \n [4,2,4], \n [4,4,1]]"}

  Expected: 
  
  "[0, 2, 3]"
===
Inputs:

  {"maxPrice":"10","vendorsDelivery":"[1]","vendorsProducts":"[[10]]"}

  Expected: 
  
  "[0]"

*/
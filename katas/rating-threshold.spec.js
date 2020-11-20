function ratingThreshold(
    threshold,
    ratings
){
  
  return
}

test('happy', () => {
    const threshold = 3.5
    const ratings = [[3,4], 
 [3,3,3,4], 
 [4]]

  const result = ratingThreshold(
    threshold,
    ratings
  )

  const expected = [1]    
  expect(result).toEqual(expected)
})


/*
  
  Inputs:

const threshold = 1.3
const ratings = [[1,1,2], 
 [1,2,2], 
 [1,4]]


  Expected: 
  
const expected = []

===

  Inputs:

const threshold = 1.45
const ratings = []


  Expected: 
  
const expected = []

===

  Inputs:

const threshold = 1
const ratings = [[2,4,5,2,1,3,4], 
 [3,4,5,5,5,3,2], 
 [1,1,1,2,1,1]]


  Expected: 
  
const expected = []

===

  Inputs:

const threshold = 5
const ratings = [[2,4,5,2,1,3,4], 
 [3,4,5,5,5,3,2], 
 [1,1,1,2,1,1]]


  Expected: 
  
const expected = [0, 1, 2]

===

  Inputs:

const threshold = 3.8
const ratings = [[4,4,3,4,4], 
 [2,4,3,3,2,2,1], 
 [5,5,3], 
 [3]]


  Expected: 
  
const expected = [1, 3]

*/
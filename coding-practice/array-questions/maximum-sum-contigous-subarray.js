const maximumSubArrSum = (arr) => {
    let maxSoFar = arr[0];
    let currentSum = arr[0];


    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSoFar = Math.max(maxSoFar, currentSum);
    }

    return maxSoFar;
};


const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maximumSubArrSum(arr)); // Output: 6

const leftRotation = (arr, d) => {
    let temp = [];

    for (let i = 0; i < d; i++) {
        temp.push(arr[i]);
    }

    for (let i = 0; i < arr.length - d; i++) {
        arr[i] = arr[i + d];
    }

    for (let i = 0; i < temp.length; i++) {
        arr[arr.length - d + i] = temp[i];
    }
}

let arr = [1, 2, 3, 4, 5];
leftRotation(arr, 2);
console.log(arr); // Output: [3, 4, 5, 1, 2]
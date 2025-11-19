const nonRepeating1 = (arr) => {
    const counts = {};
    for (const num of arr) {
        counts[num] = (counts[num] || 0) + 1;
    }


    console.log(counts);


    for (const num of arr) {
        if (counts[num] === 1) {
            console.log(num);
            return num;
        }
    }
};



const nonRepeating2 = (arr) => {
    let sign = arr[0]

    for (let i = 1; i < arr.length; i++) {
        sign ^= arr[i];
    }

    console.log(sign);
    return sign;
}


const result = nonRepeating2([9, 3, 9, 3, 9, 7, 9]);


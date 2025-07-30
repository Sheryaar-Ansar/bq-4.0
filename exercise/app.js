//odd or even
const oddOrEven = (num) => {
    let expression = false;
    if (num % 2 === 0) {
        expression = true
    } else {
        expression = false
    }
    return expression
}
console.log(oddOrEven(3));

//reverse string
const reverseStr = (str) => {
    let reverse = ''
    for (let i = str.length - 1; i >= 0; i--) {
        reverse += str[i]

    }
    return reverse
}
console.log(reverseStr('hello'));

//print 1-10 in array
const basicNum = () => {
    let output = []
    for (let i = 1; i <= 10; i++) {
        output.push(i)
    }
    return output
}
console.log(basicNum());

//palindrome
const palindromeChecker = (str) => {
    const palindrome = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return palindrome === [...palindrome].reverse().join('')
}
console.log(palindromeChecker('a man, a plan, a canal: PANAMA'));

//factorial
const factorialLoop = (n) => {
    if(n < 0){
        throw new RangeError('Negative Integer undefined')
    }
    let res = 1;
    for(let i = 2; i <= n; i++){
        console.log('i: ', i,' ', 'res: ', res);
        res *= i
    }
    return res
}
console.log(factorialLoop(5));

//For numbers 1‑20, print “Fizz” for multiples of 3, “Buzz” for multiples of 5, number otherwise.
const fizzBuzz = () => {
    let output = []
    for(let i = 1; i <= 20; i++){
        if(i % 3 === 0){
            output.push('Fizz')
        }else if(i % 5 === 0){
            output.push('Buzz')
        }else{
            output.push(i)
        }
    }
    return output
}
console.log(fizzBuzz());

//Function that returns how many a‑e‑i‑o‑u letters appear in a string.

const countVowel = (str) => {
    let vowel = 'aeiou';
    let count = 0
    for (const ch of str.toLowerCase()){
        if(vowel.includes(ch)){
            count++
        }
    }
    return count;
}
console.log(countVowel('a main'));

//Given [4, 1, 7] return 12. Try both a classic loop and reduce.
const sumOfArr = () => {
    const givenArr = [4,1,7]
    let output = 0
    for(let i = 0; i < givenArr.length; i++){
        output += givenArr[i]
    }
    return output;
}
console.log(sumOfArr());

const sumofArr2 = () => {
    const givenArr = [4,1,7];
    const total = givenArr.reduce((acc, curr)=> acc + curr, 0)
    return total
}
console.log(sumofArr2());


//Min & Max in Array
const minMaxInArr = (arr) => {
    let min = arr[0];
    let max = arr[0];
    for(const a of arr){
        if(max < a){
            max = a
        }else if(min < max){
            min = a
        }
    }
    return {min, max}
}
console.log(minMaxInArr([0,22,55, 88]));



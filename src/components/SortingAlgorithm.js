export function bubbleSortAnimation(array) {
    let animation = [];
    let auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animation);
    array = auxiliaryArray;
    return [animation, array];
}

function bubbleSort(auxiliaryArray, animation) {
    const N = auxiliaryArray.length;

    for(let i=0; i<N - 1; i++) {
        for(let j=0; j<N-i-1; j++) {
            animation.push([j,j+1]);
            animation.push([j,j+1]);
            if(auxiliaryArray[j] > auxiliaryArray[j+1]) {
                animation.push([ j,auxiliaryArray[j+1] ]);
                animation.push([ j+1, auxiliaryArray[j] ]);
                swap(auxiliaryArray, j, j+1);
            } else {
                animation.push([-1,-1]);
                animation.push([-1,-1]);
            }
        }
    }
}

function swap(auxiliaryArray, first, second) {
    let temp = auxiliaryArray[first];
    auxiliaryArray[first] = auxiliaryArray[second];
    auxiliaryArray[second] = temp;
}
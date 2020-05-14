export function getInsertionSortAnimation(array) {
    let animation = [];
    let auxiliaryArray = array.slice();
    insertionSort(auxiliaryArray, animation);
    array = auxiliaryArray;
    return [animation, array];
}

function insertionSort(auxiliaryArray, animation) {
    const n = auxiliaryArray.length;
    for(let i=1; i<n; i++) {
        let key = auxiliaryArray[i];
        let j = i - 1;
        animation.push(["comparison1", j, i]);
        animation.push(["comparison2", j, i]);
        while(j >= 0 && auxiliaryArray[j] > key) {
            animation.push(["overwrite", j+1, auxiliaryArray[j]]);
            auxiliaryArray[j+1] = auxiliaryArray[j];
            j = j - 1;

            if(j >= 0) {
                animation.push(["comparison1", j, i]);
                animation.push(["comparison2", j, i]);
            }
        }
        animation.push(["overwrite", j+1, key]);
        auxiliaryArray[j+1] = key;
    }
}
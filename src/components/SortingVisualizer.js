import React, { Component } from 'react';
import './SortingVisualizer.css';
import {bubbleSortAnimation} from './SortingAlgorithm';
import {getInsertionSortAnimation} from './InsertionSort';

const PRIMARY_COLOR = 'turquoise'; //Normal color of bars
const SECONDARY_COLOR = 'red'; //Color of bars when they are being compared
const ANIMATION_SPEED = 40;

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class SortingVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array : []
        }
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray() {
        const array = [];
        for(let i=0; i<20; i++) {
            array.push(randomNum(5,250));
        }
        this.setState({array})
    }

    bubbleSort() {
        const [animation, sortArray] = bubbleSortAnimation(this.state.array);

        for(let i=0; i<animation.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1)
            const arrayBars = document.getElementsByClassName('array-bar');

            if(isColorChange) {
                const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOne, barTwo] = animation[i];
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED)
            } else {
                const [barIndex, newHeight] = animation[i];
                if(barIndex === -1)
                    continue;
                else {
                    const barStyle = arrayBars[barIndex].style;
                    setTimeout(()=> {
                        barStyle.height = `${newHeight}px`
                    }, i * ANIMATION_SPEED)
                }
            }
        }
    }

    insertionSort() {
        const [animation, sortedArray] = getInsertionSortAnimation(this.state.array);

        for(let i=0; i<animation.length; i++) {
            const isColorChange = (animation[i][0] === 'comparison1') || (animation[i][0] === 'comparison2')
            const arrayBars = document.getElementsByClassName('array-bar');

            if(isColorChange) {
                const color = (animation[i][0] === 'comparison1') ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOne, barTwo] = animation[i];
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED)
            } else {
                const [temp, barIndex, newHeight] = animation[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED)
            }
        }
    }
    
    render() {
        const { array } = this.state;
        return(
            <div className="array-container">
            {
                array.map((value, index) => (
                    <div className="array-bar"
                         key={index} 
                         style={{height : `${value}px`}}>
                    </div>
                ))
            }
            <div>
                <button onClick={ () => this.resetArray()}>Generate Array</button>
                <button onClick={ () => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={ () => this.insertionSort()}>InsertionSort Sort</button>
            </div>
            </div>
            
        )
    }
}

export default SortingVisualizer;


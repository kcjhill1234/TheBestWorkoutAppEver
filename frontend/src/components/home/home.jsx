import React from "react"
// import { text } from "express"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.quotes = [
            '"Never do tomorrow what you can do today. Procrastination is the thief of time." – Charles Dickens',
            '“There are far, far better things ahead than any we leave behind.”– CS Lewis',
            "Quote 3",
            "Quote 4",

        ]
        this.state = { quoteIndex: 0};
    }
    onButtonClick = () => {
        let index = (this.state.quoteIndex +1) % (this.quotes.length)  
        this.setState({ quoteIndex: index})

    }
    render() {
        return (<div className="container">

            <img className="hero-image" src="/assets/fitness.jpg" alt="" />

            <h2>Goals</h2>
            <p>When setting fitness goals, your goals should be specific and challenging. Studies have proven that setting specific goals will result in better performance. </p>
            <h2>Tools</h2>
            <p>We have wide variety of exercises and workouts for every body part. </p>


            <h2>Inspiration</h2>
            <p>{this.quotes[this.state.quoteIndex]}</p> 
            <button className= "btn btn-dark" onClick={this.onButtonClick}>
                Next</button>
        </div>
        )

    }
}
export default Home;
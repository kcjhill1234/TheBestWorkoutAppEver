import React from "react";
import { Segment } from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.quotes = [
      '"Never do tomorrow what you can do today. Procrastination is the thief of time." – Charles Dickens',
      "“There are far, far better things ahead than any we leave behind.”– CS Lewis",
      "Of course it’s hard. It’s supposed to be hard. If it were easy, everybody would do it. Hard is what makes it great.",
      "Your body can stand almost anything. It’s your mind that you have to convince.",
      "“Well done is better than well said.”- Benjamin Franklin",
      '"If you want something you’ve never had, you must be willing to do something you’ve never done."- Thomas Jefferson',
      '"I have nothing in common with lazy people who blame others for their lack of success. Great things come from hard work and perseverance. No excuses." - Kobe Bryant',
    ];
    this.state = { quote: "" };
  }
  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState({ quote: this.getRandomQuote(this.quotes) });
    }, 3000);
  };
  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  getRandomQuote = (array) => {
    return array[Math.ceil(Math.random() * array.length - 1)];
  };

  render() {
    return (
      <Segment className="home">
        <h2>Goals</h2>
        <p>
          When setting fitness goals, your goals should be specific and
          challenging. Studies have proven that setting specific goals will
          result in better performance.
        </p>
        <h2>Tools</h2>
        <p>
          We have wide variety of exercises and workouts for every body part.
        </p>

        <h2>Inspiration</h2>
        <p>{this.state.quote}</p>
      </Segment>
    );
  }
}
export default Home;

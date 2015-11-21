const React = require("react");
const styles = require("Board.css");

const Picker = require("Picker")
const Previous = require("Previous")
const FillPercentText = require("FillPercentText")

module.exports = React.createClass({
  displayName: "Board",
  getInitialState: function(){
    return {
      totalScore: this.props.game.score,
      guessNumberThisLevel: 0,
      guess: {
        dots: Array(this.props.game.config.length).fill({}),
        result: []
      }
    }
  },
  componentDidMount: function(){
    window.removeEventListener("touchmove", function noop(e){
      e.preventDefault();
      return false
    });
    window.addEventListener("touchmove", function noop(e){
      e.preventDefault();
      return false
    });
  },
  guess: function(guess){
    if (!this.state.guess.dots.every((a, i) => {
      return a.key === guess[i].key
    })) {
      const result = this.props.game.guess(guess)

      this.setState({
        totalScore: this.props.game.score,
        guessNumberThisLevel: this.state.guessNumberThisLevel + 1,
        guess: {
          dots: guess,
          result: result
        }
      })
      if (result.join() === Array(this.props.game.config.length).fill("F").join()) {
        this.win(guess);
      } else if(this.state.guessNumberThisLevel === this.props.game.config.handicap) {
        this.loose();
      }
    }
  },
  win: function(){
    this.newLevel(1)
  },
  loose: function(){
    this.newLevel(0)
  },
  newLevel: function(increase){
    this.props.game.sequence = this.props.game.createSequence();
    this.props.game.score.levelsCompleted = this.props.game.score.levelsCompleted + increase;
    this.setState(this.getInitialState());
  },
  render: function(){
    return <section className={styles("board")}>
      <span className={styles("level")}>{"Level " + this.state.totalScore.levelsCompleted}</span>
      <FillPercentText percent={((this.state.guessNumberThisLevel) / (this.props.game.config.handicap)) * 100}
                       colourStops={{
                         100: "rgb(250, 51, 50)",
                         75: "rgb(255, 238, 29)",
                         50: "rgb(65, 193, 122)"
                       }}
                       direction="to top">
                    {this.state.guessNumberThisLevel}
      </FillPercentText>
      <Previous game={this.props.game} board={this} guess={this.state.guess}/>
      <Picker game={this.props.game} board={this}/>
      </section>
  }
});

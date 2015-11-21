const React = require("react");

const styles = require("Picker.css");

const DotPicker = require("DotPicker");

module.exports = React.createClass({
  displayName: "Picker",
  getInitialState: function(){
    return {
      focus: -1,
      types: Array.apply(null, {
        length: this.props.game.config.length
      }).map(this.props.game.randomDot)
    }
  },
  componentDidMount: function(){
    window.removeEventListener("keydown", this.keyListener);
    window.addEventListener("keydown", this.keyListener);
  },
  changeColor: function(position, arg, e){
    let changeTo = 0;
    if (this.state.types[position].i + arg < this.props.game.config.dots.length) changeTo = this.state.types[position].i + arg

    if (this.state.types[position].i + arg < 0) changeTo = this.props.game.config.dots.length - 1

    this.changeDot(position, this.props.game.config.dots[changeTo])

    if (e) e.preventDefault();
  },
  changeFocus: function(arg){
    let changeTo = 0;
    if (this.state.focus + arg <= this.props.game.config.length - 1) changeTo = this.state.focus + arg
    if (this.state.focus + arg < 0) changeTo = this.props.game.config.length - 1

    this.setState({focus: changeTo})
  },
  changeDot: function(dotI, type){
    this.state.types[dotI] = type;
    this.forceUpdate()
  },
  submit: function(e){
    console.log("SUBMIT")
    this.props.board.guess(this.state.types.slice(0))
    if (e) e.preventDefault();
  },
  keyListener: function(e){
    if (e.keyCode === 13) {
      this.submit()
    }
    if (e.keyCode === 37) {
      this.changeFocus(-1)
    }
    if (e.keyCode === 38) {
      this.changeColor(this.state.focus, 1)
    }
    if (e.keyCode === 39) {
      this.changeFocus(1)
    }
    if (e.keyCode === 40) {
      this.changeColor(this.state.focus, -1)
    }
    e.preventDefault();
  },
  render: function(){
    return <section className={styles("picker")}>
      <div className={styles("touch")} onTouchStart={this.submit}/>
      {this.state.types.map((t, i) => {
        return <DotPicker key={i} pos={i} picker={this} types={this.props.game.config.dots} type={t} focus={i === this.state.focus}/>
      }, this)
}
    </section>
  }
});

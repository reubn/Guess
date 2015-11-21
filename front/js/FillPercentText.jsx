const React = require("react");
const styles = require("FillPercentText.css");

module.exports = React.createClass({
  displayName: "FillPercentText",
  render: function(){
    const colour = this.props.colourStops[Object.keys(this.props.colourStops).sort((a, b) => a - b).find(s => this.props.percent <= s )]
    console.log(colour, this.props.percent, this)
    return <span className={styles("text")}
          style={{
            background: `linear-gradient(${this.props.direction}, ${colour} 0%,${colour} ${this.props.percent}%,rgb(232, 232, 232) ${this.props.percent}%,rgb(232, 232, 232) 100%)`,
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text"
          }}>
    {this.props.children}
  </span>
  }
});

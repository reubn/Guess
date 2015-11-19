const React = require("react");
const styles = require("DotPicker.css");

module.exports = React.createClass({
  render: function(){
    return <section className={styles("dotPicker", {focus: this.props.focus})}
                    style={{background: this.props.type.hex}}
                    onTouchStart={this.props.picker.changeColor.bind(this.props.picker, this.props.pos, 1)}
                    onClick={this.props.picker.changeColor.bind(this.props.picker, this.props.pos, 1)}>
      <div className={styles("inner")}/>
    </section>
  }
});

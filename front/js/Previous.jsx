const React = require("react");
const styles = require("Previous.css");

module.exports = React.createClass({
  displayName: "Previous",
  render: function(){
    return <section className={styles("previous")}>
      <span className={styles("results")}>
        {this.props.guess.result.map((s, i) => {return <section key={s + i} className={styles("result", s)}></section>})}
        </span>
      <span className={styles("dots")}>
        {this.props.guess.dots.map((d, i) => {return <section key={i} className={styles("dot")} style={{background: (d.hex) || "#ececec"}}></section>})}
        </span>
    </section>
  }
});

import styles from "./snake.module.css";

const Snake = ({ dots }) => {

  return (
    <div className={styles.snake}>
      {dots.map((dot, i) => {
        const style = {
          left: `${dot[0] * 10}px`,
          top: `${dot[1] * 10}px`,
        };
        return <div key={i} className={styles.snakePoint} style={style}></div>;
      })}
    </div>
  );
};

export default Snake;

import styles from "./food.module.css";

const Food = ({ coordinates }) => {
  const style = {
    left: `${coordinates[0] * 10}px`,
    top: `${coordinates[1] * 10}px`,
  };
  return <div className={styles.food} style={style}></div>;
};

export default Food;

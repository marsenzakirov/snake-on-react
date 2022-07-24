import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import { Component, useState } from "react";
import { useEffect, useRef } from "react";
import Snake from "../components/snake/snake";
import Food from "../components/food/food";
export default function Home() {
  const [dots, setDots] = useState([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
  const [coordinates, setCoordinates] = useState([]);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    randomCordinates(dots);
    setInterval(() => {

      console.log(direction);
    }, 1000);
  }, []);
  function randomCordinates(dots) {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    setCoordinates([x, y]);
  }

  function eatFood(dots, coordinates) {
    const head = [dots[dots.length - 1][0], dots[dots.length - 1][1]];

    if (head[0] == coordinates[0] && head[1] == coordinates[1]) {
      randomCordinates(dots);
      return true;
    }
    return false;
  }
  function isSnake(dots, direction, coordinates) {
    const x = dots[dots.length - 1][0];
    const y = dots[dots.length - 1][1];
    if (direction === undefined) {
      for (let i = 0; i < dots.length; i++) {
        if (dots[i][0] === coordinates[0] && dots[i][1] === coordinates[1]) {
          return true;
        }
      }
    }
    for (let i = 0; i < dots.length - 1; i++) {
      if (direction == "up" && y - 1 == dots[i][1] && x == dots[i][0]) {
        return true;
      } else if (
        direction == "down" &&
        y + 1 == dots[i][1] &&
        x == dots[i][0]
      ) {
        return true;
      } else if (
        direction == "right" &&
        x + 1 == dots[i][0] &&
        y == dots[i][1]
      ) {
        return true;
      } else if (
        direction == "left" &&
        x - 1 == dots[i][0] &&
        y == dots[i][1]
      ) {
        return true;
      }
    }
    return false;
  }
  const move = (e) => {
    if (
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      return;
    }
    if (e.key === "ArrowUp") {
      if (dots[dots.length - 1][1] === 0) {
        return;
      }
      if (isSnake(dots, "up")) {
        return;
      }
      setDirection("up");
    } else if (e.key === "ArrowDown") {
      if (dots[dots.length - 1][1] === 39) {
        return;
      }
      if (isSnake(dots, "down")) {
        return;
      }
      setDirection("down");
    } else if (e.key === "ArrowLeft") {
      if (dots[dots.length - 1][0] === 0) {
        return;
      }
      if (isSnake(dots, "left")) {
        return;
      }
      setDirection("left");
    } else if (e.key === "ArrowRight") {
      if (dots[dots.length - 1][0] === 39) {
        return;
      }
      if (isSnake(dots, "right")) {
        return;
      }
      setDirection("right");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.game} tabIndex="1" onKeyDown={(e) => move(e)}>
        <Snake dots={dots} />
        <Food coordinates={coordinates} />
      </div>
    </div>
  );
}

let data = [];
const weigths = [
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
  { w: Math.random() },
];
function generateTest() {
  let result = { input: [], output: [""] };

  const snake = "s";
  const fruit = "f";
  field = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  randomXSnake = Math.floor(Math.random() * 5);
  randomYSnake = Math.floor(Math.random() * 5);
  randomXFruit = Math.floor(Math.random() * 5);
  randomYFruit = Math.floor(Math.random() * 5);
  while (randomXSnake === randomXFruit && randomYSnake === randomYFruit) {
    randomXFruit = Math.floor(Math.random() * 5);
    randomYFruit = Math.floor(Math.random() * 5);
  }
  field[randomYSnake][randomXSnake] = snake;
  field[randomYFruit][randomXFruit] = fruit;
  if (randomXSnake == randomXFruit) {
    if (randomYSnake > randomYFruit) {
      result = {
        input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
        output: ["up"],
      };
    } else {
      result = {
        input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
        output: ["down"],
      };
    }
  }
  if (randomYSnake == randomYFruit) {
    if (randomXSnake > randomXFruit) {
      result = {
        input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
        output: ["left"],
      };
    } else {
      result = {
        input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
        output: ["right"],
      };
    }
  }
  if (randomXSnake > randomXFruit && randomYSnake > randomYFruit) {
    result = {
      input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
      output: ["up", "left"],
    };
  }
  if (randomXSnake > randomXFruit && randomYSnake < randomYFruit) {
    result = {
      input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
      output: ["up", "right"],
    };
  }
  if (randomXSnake < randomXFruit && randomYSnake > randomYFruit) {
    result = {
      input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
      output: ["down", "left"],
    };
  }
  if (randomXSnake < randomXFruit && randomYSnake < randomYFruit) {
    result = {
      input: [randomXSnake, randomYSnake, randomXFruit, randomYFruit],
      output: ["down", "right"],
    };
  }
  return result;
}
function generateData() {
  for (let i = 0; i < 300; i++) {
    data.push(generateTest());
  }
}
generateData();

const sigmoid = (x) => 1 / (1 + Math.exp(-x));

const sigmoidDerivative = (x) => x * (1 - x);

const NN = (i1, i2, i3, i4) => {
  let hidden = [];
  let output = [];
  let i = 0;
  while (i < weigths.length) {
    if (hidden.length < 4) {
      const h_input =
        weigths[i].w * i1 +
        weigths[i + 1].w * i2 +
        weigths[i + 2].w * i3 +
        weigths[i + 3].w * i4;
      h = sigmoid(h_input);
      hidden.push(h);
    } else if (hidden.length == 4) {
      const o_input =
        weigths[i].w * hidden[0] +
        weigths[i + 1].w * hidden[1] +
        weigths[i + 2].w * hidden[2] +
        weigths[i + 3].w * hidden[3];
      o = sigmoid(o_input);
      output.push(o);
    }
    i += 4;
  }
  console.log(output);
  console.log(Math.max(...output));
  console.log(output.indexOf(Math.max(...output)));
  if (output.indexOf(Math.max(...output)) == 0) {
    return "up";
  }
  if (output.indexOf(Math.max(...output)) == 1) {
    return "down";
  }
  if (output.indexOf(Math.max(...output)) == 2) {
    return "left";
  }
  if (output.indexOf(Math.max(...output)) == 3) {
    return "right";
  }
  if (output.indexOf(Math.max(...output)) == 4) {
    return "up,left";
  }
  if (output.indexOf(Math.max(...output)) == 5) {
    return "up,right";
  }
  if (output.indexOf(Math.max(...output)) == 6) {
    return "down,left";
  }
  if (output.indexOf(Math.max(...output)) == 7) {
    return "down,right";
  }
};

const showResult = () => {
  console.log(data.length);
  data.forEach(({ input, output }) => {
    console.log(`${input} XOR ${output} => ${NN(...input)}`);
  });
};
showResult();

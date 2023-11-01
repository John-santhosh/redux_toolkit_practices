import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./counter";
import { useState } from "react";
const Counter = () => {
  const { count } = useSelector((store) => store.counter);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  return (
    <div>
      <p>Counter {count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />

      <div>
        <button onClick={() => dispatch(incrementByAmount(+incrementAmount))}>
          Add value
        </button>
      </div>

      <button
        onClick={() => {
          setIncrementAmount(0);
          dispatch(reset());
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;

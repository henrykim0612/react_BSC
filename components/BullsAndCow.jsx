import React, {useState, useRef} from 'react';
import History from "./History";

// 중복되지 않는 숫자 생성
const getAnswer = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let res = [];
  [null, null, null, null].map((d, i) => {
    const v = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    res = [...res, v];
  });
  return res;
}

const BullsAndCow = () => {

  const [answer, setAnswer] = useState(getAnswer());
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState([]); // 시도는 10번
  const[reGame, setReGame] = useState(false);
  const [limit, setLimit] = useState(10);
  const inputRef = useRef(null);

  const onRetry = (e) => {
    e.preventDefault();
    setAnswer(getAnswer());
    setValue('');
    setTries([]);
    setResult('');
    setReGame(false);
  }

  const setInputFocus = () => {
    inputRef.current.focus();
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('HOMERUN~~!');
      setReGame(true);
    } else {
      // Strike, Ball 판별
      const valueArr = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length < limit) {
        valueArr.map((v, i) => {
          if (v === answer[i]) {
            strike++;
          } else {
            if (answer.includes(v)) {
              ball++;
            }
          }
        });
        setResult(`Strike: ${strike}, Ball: ${ball}`);
        setTries((prevState) => [...prevState, {value, idx: (tries.length + 1)}]);
        setInputFocus();
      } else {
        // 기회 모두 소진
        setResult('GAME OVER...')
        setReGame(true);
      }
    }
  }

  if (reGame) {
    return (
      <div>
        <h2 className="help">Bulls and Cow !!</h2>
        <p>{result}</p>
        <form onSubmit={onRetry}>
          <button type="submit">Retry</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2 className="help">Bulls and Cow !!</h2>
        <p>{`답: ${answer.join('')}`}</p>
        <form onSubmit={onSubmit}>
          <input type="text" maxLength="4" value={value} onChange={onChange} ref={inputRef}/>
          <button type="submit">Enter</button>
        </form>
        <p>{result}</p>
        {tries.map((v, i) => <History key={`${i + 1}`} hisInfo={v} />)}
      </div>
    )
  }
}

export default BullsAndCow;
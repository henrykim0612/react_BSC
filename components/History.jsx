import React, {memo} from 'react';

const History = memo(({hisInfo}) => {
  return (
    <>
      <p>{`${hisInfo.idx}차 시도: ${hisInfo.value}`}</p>
    </>
  )
});

export default History;

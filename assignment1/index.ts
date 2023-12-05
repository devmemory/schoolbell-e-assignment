//  1, 3, 5, 7, 9 숫자를 한번씩 써서 만들 수 있는 두개의 숫자(예를들면 13, 579)중 곱한 값이 가장 큰 조합을 찾아주세요.(언어는 자바스크립트 또는 타입스크립트를 사용 바랍니다)

// strategy1 : 경우의 수 체크
// 1자리 + 4자리, 2자리 + 3자리,

// strategy2 : 자리수가 2 이상일 때 가장 큰 숫자로 sort 후 숫자로 변환
const arr = [1, 3, 5, 7, 9];

type CandidateType = {
  k: number[];
  v: number;
};

const checkNumber = (arr: number[]) => {
  let obj14: Object = {};
  let obj23: Object = {};

  let candidate: CandidateType[] = [];

  arr.forEach((e1) => {
    if (!obj14.hasOwnProperty(e1)) {
      obj14[e1] = {};
    }

    const sortedArr = arr.filter((v) => v !== e1).sort((a, b) => b - a);

    let numStr: string = "";

    numStr = sortedArr.reduce((a, b) => `${a}` + `${b}`, numStr);
    obj14[e1] = Number(numStr);

    // 1자리, 4자리 추가
    candidate = [...candidate, { k: [e1, obj14[e1]], v: e1 * obj14[e1] }];

    sortedArr.forEach((e2) => {
      const key = e1 * 10 + e2;
      if (!obj23.hasOwnProperty(key)) {
        numStr = "";
        numStr = sortedArr
          .filter((v) => v !== e2)
          .reduce((a, b) => `${a}` + `${b}`, numStr);

        obj23[key] = Number(numStr);

        // 2자리, 3자리
        candidate = [
          ...candidate,
          { k: [key, obj23[key]], v: key * obj23[key] },
        ];
      }
    });
  });

  const max = candidate.reduce((prev, current) =>
    prev.v > current.v ? prev : current
  );

  return { array: max.k, value: max.v };
};

const result = checkNumber(arr);

console.log(result);

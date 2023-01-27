const convertSeconds = (totalSeconds: number) => {
  // 👇️ get the number of full minutes
  const minutes = Math.floor(totalSeconds / 60);

  // 👇️ get the remainder of the seconds
  const seconds = totalSeconds % 60;

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  // ✅ format as MM:SS
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`; // 👉️ "09:25"
  return result;
};

export default convertSeconds;

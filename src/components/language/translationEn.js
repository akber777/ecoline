const en =
  localStorage.getItem("lang") !== null &&
  localStorage.getItem("lang") !== undefined
    ? JSON.parse(localStorage.getItem("lang"))
    : "";

export default en !== "" ? en.messages.en : "";

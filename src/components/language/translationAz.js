const az =
  localStorage.getItem("lang") !== null &&
  localStorage.getItem("lang") !== undefined
    ? JSON.parse(localStorage.getItem("lang"))
    : "";

export default az !== "" ? az.messages.az : "";

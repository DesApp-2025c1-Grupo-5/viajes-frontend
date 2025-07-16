const parseFecha = (isoString) => {
    const date = new Date(isoString);
    date.setDate(date.getDate());
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(date.getDate())}-${pad(
      date.getMonth() + 1
    )}-${date.getFullYear()}`;
  };

  export default parseFecha;
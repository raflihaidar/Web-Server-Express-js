const handleDetail = (e, item) => {
  e.preventDefault();
  window.location = `/${item.NIM}`;
  console.log(item);
};

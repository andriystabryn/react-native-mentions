export const getUserSuggestions = (name = "") => {
  // return fetch(`http://localhost:8080/?id=${name.slice(1)}`, {
  //     method: 'GET',
  //     headers: {
  //         "Content-type": "application/json"
  //     }
  // })
  //     .then((res) => {
  //         console.log(res);
  //         if (!res.ok) {
  //             throw new Error("Went wrong");
  //         }
  //         return res.json();
  //     })
  const result = [
    {
      name: "Samsung",
      id: "1111111111"
    },
    {
      name: "HP",
      id: "22222222"
    },
    {
      name: "Simens",
      id: "33333333"
    }
  ].filter(item => {
    return item.name.toLowerCase().indexOf(name.toLowerCase().slice(1)) > -1;
  });
  return result;
};

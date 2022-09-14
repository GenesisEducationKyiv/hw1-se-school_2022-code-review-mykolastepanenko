import axios from "axios";

const promises = [
  axios.get("https://jsonplaceholder.typicode.com/users"),
  axios.get("https://jsonplaceholder.typicode.com/posts"),
];

Promise.all(promises).then(res => {
    console.log(res[0].data)
})
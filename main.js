// const myPromise = new Promise((resolve, reject) => {
//   const error = false;
//   if (!error) {
//     resolve("Yes resolved the promise");
//   } else {
//     reject("No rejected the promise");
//   }
// });

// console.log(myPromise);

// myPromise
//   .then((value) => {
//     return value + 1;
//   })
//   .then((newValue) => {
//     console.log(newValue);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const myNextPromise = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     resolve("myNextPromise resolved");
//   }, 3000);
// });

// myNextPromise.then((value) => {
//   console.log(value);
// });

// myPromise.then((value) => {
//   console.log(value);
// });

// const users = fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     data.forEach((user) => {
//       console.log(user);
//     });
//   });

const postSection = document.querySelector("#posts");
const postTemplate = document.querySelector("#post-template");

getData().catch((err) => console.error(err));

async function getData() {
  const postStream = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await postStream.json();
  let i = 0;

  //   console.log(posts);

  posts.forEach((post) => {
    i++;
    if (i < 10) {
      const title = post.title;
      const body = post.body;

      fetch("https://unsplash.it/300/200")
        .then((res) => res.blob())
        .then((blob) => {
          const newPost = document.importNode(postTemplate.content, true);
          const postTitle = newPost.querySelector(".post-title");
          const postBody = newPost.querySelector(".post-body");
          const postImg = newPost.querySelector(".post-img");

          postImg.src = URL.createObjectURL(blob);
          postTitle.innerText = title;
          postBody.innerText = body;
          postSection.appendChild(newPost);
        })
        .catch((err) => console.error(err));
    }
  });
}

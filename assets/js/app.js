const tweetList = document.querySelector('#lista-tweets');

eventListeners();

function eventListeners() {

  document.querySelector('#formulario').addEventListener('submit', addTweet);
  tweetList.addEventListener('click', removeTweet);
  document.addEventListener('DOMContentLoaded', loadTweetsFromLocalStorage);
}

function createTweetStructure(tweet) {
  const item = document.createElement('li');
  item.innerText = tweet;
  tweetList.appendChild(item);

  const deleteTweet = document.createElement('span');
  deleteTweet.classList = 'borrar-tweet';
  deleteTweet.innerText = 'Borrar';
  item.appendChild(deleteTweet);
}

function addTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector('#tweet').value;
  createTweetStructure(tweet);
  addTweetToLocalStorage(tweet);
}

function addTweetToLocalStorage(tweet) {
  let tweets;
  tweets = getTweetsFromLocalStorage();
  tweets.push(tweet);
  localStorage.setItem('tweets', JSON.stringify(tweets));
}



function removeTweet(e) {
  e.preventDefault();
  if (e.target.className === 'borrar-tweet') {

    const confirmRemove = confirm('¿Desea borrar el tweet?');

    if (confirmRemove) {
       e.target.parentElement.remove();
       removeTweetFromLocalStorage(e.target.parentElement.innerText);
    } else {
      return;
    }
  }
}

function removeTweetFromLocalStorage(tweet) {
  let tweets, removeTweet;
  removeTweet = tweet.substring(0, tweet.length - 6);
  tweets = getTweetsFromLocalStorage();
  tweets.forEach(function(tweet, i) {
    if (removeTweet === tweet) {
      tweets.splice(i, 1);
    }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromLocalStorage() {
  let tweets;
  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

function loadTweetsFromLocalStorage() {
  let tweets;
  tweets = getTweetsFromLocalStorage();
  tweets.forEach(function(tweet) {
    createTweetStructure(tweet);
  })
}

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const prevQuoteBtn = document.getElementById('prev');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Maintaining Index
let index = 0;

//First index
let firstindex = 0;

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//getting new quote
function Quote(index) {
    loading();
    const quote = Quotes[index];

    // Check if author field is blank and if then replace it with unknown
    if (!quote.author) {
        authorText.textContent = "Unknown";
    }
    else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine stylinh
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

function newQuote(){
    index += 1 ;
    Quote(index);
}


function previous(){
    if(index > firstindex){
        index -= 1;
        Quote(index);
    }
}

//get quote from api
async function getQuotes() {
    try {
        index = Math.floor(Math.random() * Quotes.length) ;
        firstindex = index ;
        Quote(index);
    }
    catch (error) {
        alert("Please check your internet connection");
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listener 
newQuoteBtn.addEventListener('click', newQuote);
prevQuoteBtn.addEventListener('click', previous);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
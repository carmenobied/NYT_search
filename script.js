// Global variables
var keyword = '';
var startYear;
var endYear;
var numOfResults;

// listen to the search button click and display the result
$('#search').on('click', (event) => {
    event.preventDefault();
    displayResult();
})

// clear all the field and the list result when clicking on the clear button
$('#clear-results').on('click', (event) => {
    event.preventDefault();
    $('#article-div').empty();
    $('#search-term').val('');
    $('#end-year').val('');
    $('#start-year').val('');
    $('#number-of-records').val(1);
})

// display the result based on the user input
function displayResult () {
    $('#article-div').empty();
    keyword = $('#search-term').val().trim();

    // check if the start year is empty then use the default year as 2015
    if ($('#start-year').val().trim() === ''){
        startYear = '2015';
    }
    else {
        startYear = $('#start-year').val().trim();
    }

    // check if the end year is empty then use the default year as 2020 (current year)
    if ($('#end-year').val().trim() === ''){
        endYear = '2020';
    }
    else {
        endYear = $('#end-year').val().trim();
    }

    numOfResults = $('#number-of-records').val();

    // constructing the url api end point (NYT API)
    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date='+ startYear +'0101&end_date='+ endYear +'0101&q='+ keyword +'&api-key=LMkxKRp7qsh2wuJzUYMi6CXG3azIVn36';
    
    // console.log(`${keyword} ${startYear} ${endYear} ${numOfResults}`);
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then( (response) => {
        console.log(response);
        
        // create new unorder list and add list-group class for styling
        var resultList = $('<ul>');
        resultList.addClass('list-group');
        
        for (let i = 0; i < +numOfResults; i++) {
            
            var myResponse = response.response.docs;

            //create new list element and add list-group-item for styling
            var myItem = $('<li>');
            myItem.addClass('list-group-item');

            //retrieve the main headline from response and add it to the list text
            myItem.html(`
            <h3>${i+1}. ${myResponse[i].headline.main}</h3>
            <p>Learn More: <a href =${myResponse[i].web_url} target = 'blank'>${myResponse[i].web_url}</a></p>
            `);

            // append the list to the ul
            resultList.append(myItem);

            //append the ul to the article-div
            $('#article-div').append(resultList);

        }
    });
}
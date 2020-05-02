$("#find-article").on("click", function(event) {
    event.preventDefault();
    // var article = $("#article-input").val();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coronavirus&fq=headline&fq=person&api-key=LMkxKRp7qsh2wuJzUYMi6CXG3azIVn36";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#article-view").text(JSON.stringify(response));
    });
  });

//   Our API key = LMkxKRp7qsh2wuJzUYMi6CXG3azIVn36 
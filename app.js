console.log("Let's get this party started!");
const $gifArea = $("#gif-area");
const $searchInput = $("#search");

//funcion to append a GIF to the gif container
function addGif(res){
    let numResults = res.data.length;

    if(numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);
        let $newCol = $("<div>", {class: "col-md-4 col-12 mb-4"});
        let $newGif = $("<img>", {
            src: res.data[randomIdx].images.original.url,
            class: "w-100"
        });
        $newCol.append($newGif)
        $gifArea.append($newCol);
    }
}

//to make axios GET request
$("form").on("submit", async function(e){
    e.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val("");

    const response = await axios.get('http://api.giphy.com/v1/gifs/search' , {
        params: {
            api_key: "dP2pxGoykREI35hPj4TmunzDzsRQbPmJ",
            q: searchTerm,
        }
    });

//checking that I received the right info
// console.log(result.data);

    //append Gif to Dom
    addGif(response.data);
});

//removes all appended GIFS upon clicking button
$("#remove").on("click", function(){
    $gifArea.empty();
});
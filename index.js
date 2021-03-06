/**************************************
 Populuating cryptocurrency table
 *************************************/

//Request data from CMC API
 function request_table()
{
    //using cors anywhere to get around cors issue
    let cors= 'https://cors-anywhere.herokuapp.com/'
    let api_link = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=25"
    let url = cors + api_link;
    
    //request headers
    let headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'close',
        'Host': 'cors-anywhere.herokuapp.com',
        'If-None-Match': "b493126da505af6fec015ec116fec193",
        'Origin': 'http://127.0.0.1:80/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
        'X-CMC_PRO_API_KEY': 'dddd7b23-d72f-48c8-934f-33136b9b827b',
    }
   
    //fetch the api
    fetch(url,{headers})
        .then(
         function (response){
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            return response
         }     
        )
        .then(response => response.json())
        .then(json => add_listings(json.data))
        .catch(err => console.log(err))
}

//populate table with entries
function add_listings(data)
{    
    //table element
    const table = document.getElementById("table_body")
    table.innerHTML = ''

    //for loop vars
    var i;
    const list_length = data.length

    //add listings to table
    for(i = 0; i < list_length; i++)
    {
    var row = 
    `<tr>
      <td onclick=>${i+1}</td>
      <td  >
        <a class="name" href="https://dulaimi99.github.io/Cryptocurrency-Tracker/details.html?currency=${data[i].name}">
            ${data[i].name} (${data[i].symbol})
        </a>
      </td>
      <td>$${numeral(data[i].quote.USD.price).format('0,0.00')}</td>
      <td>$${numeral(data[i].quote.USD.market_cap).format('0,0')}</td>
      <td>$${numeral(data[i].quote.USD.volume_24h).format('0,0')}</td>
      <td>${numeral(data[i].quote.USD.percent_change_7d).format('0,0.00')}%</td>
      <td>${numeral(data[i].quote.USD.percent_change_24h).format('0,0.00')}%</td>
    </tr>`
    table.innerHTML += row
    
    }
}





/******************************
 Search
 *****************************/
// extract search parameter and create new page
function load_crypto()
{
    //extract search query
    search_value = document.getElementById("search_input").value;
    
    //construct new url
    var url = "https://dulaimi99.github.io/Cryptocurrency-Tracker/details.html?currency=" + search_value

    //load new page
    window.open(url)
}








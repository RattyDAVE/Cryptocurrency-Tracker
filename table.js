/**************************************
 Populuating cryptocurrency table
 *************************************/
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
        .catch(err => resolve_issue(err))
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

    for(i = 0; i < list_length; i++)
    {
    var row = 
    `<tr>
      <td>${i+1}</td>
      <td>${data[i].name} (${data[i].symbol})</td>
      <td>$${data[i].quote.USD.price.toFixed(2)}</td>
      <td>$${data[i].quote.USD.market_cap.toFixed(0)}</td>
      <td>$${data[i].quote.USD.volume_24h.toFixed(0)}</td>
      <td>${data[i].quote.USD.percent_change_7d.toFixed(2)}%</td>
      <td>${data[i].quote.USD.percent_change_24h.toFixed(2)}%</td>
    </tr>`
    table.innerHTML += row
    
    }

}

//function to catch error
function resolve_issue(obj)
{
    console.log(obj)
}


/******************************
 Table ordering & Search bar 
 *****************************/

$('th').on('click', function(){
    var column = $(this).data('column')
    var order = $(this).data('order')
    var text = $(this).html()
    text = text.substring(0, text.length - 1)
  
    if(order == 'desc'){
      $(this).data('order', "asc")
      myArray = myArray.sort((a,b) => a[column] > b[column] ? 1 : -1)
      text += '&#9660'
  
    }else{
      $(this).data('order', "desc")
      myArray = myArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
      text += '&#9650'
  
    }
    $(this).html(text)
    buildTable(myArray)
  })
  
  $('#search_input').on('keyup', function(){
      var value = $(this).val()
      console.log('Value:', value)
      var data = searchTable(value, myArray)
      buildTable(data)
  })
  
  function searchTable(value, data){
      var filteredData = []
  
      for(var i = 0; i < data.length; i++){
          value = value.toLowerCase()
          var name = data[i].name.toLowerCase()
  
          if(name.includes(value)){
              filteredData.push(data[i])
          }
      }
      return filteredData
  }
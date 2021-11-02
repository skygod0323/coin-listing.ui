import React, {useState} from 'react';
import Header from '../../layout/header';
import Api from '../../helper/api';
import "@grapecity/wijmo.styles/wijmo.css";
import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import {Container} from 'react-bootstrap';
import LongMenu from './menu';
import na_img from '../../assets/n_a.png';
import eth_icon from '../../assets/etherscan-logo.png';

const renderGraphCell = function(params, mode=3) {
  
  return params.value.length == 1 ? (
    <><img src={na_img} style={{width: '90%'}}/></>
  ) : 
  (
    <>
      <div style={{width:'65%'}}>
        <Sparklines
            data={convertVal(params.value)}
            margin={6}
            height={40}
            width={200}
            >
            <SparklinesLine
                style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, mode) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
            />
          
        </Sparklines>
      </div>
      <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
        <font style={{color:calculatePercentage(params.value, mode) >= 0 ? "#2fa608":"#c71208"}}>
        {calculatePercentage(params.value, mode) >= 0? ' + ':' '} {calculatePercentage(params.value, mode)} %
        </font>
      </div>
    </>
  )
}

const columns = (hides) => {
  return [
    {field: 'id', headerName: 'id', width: '30', description:
      'The identification used by the person with access to the online service.', 
      headerClassName:'Column-header', hide: hides['id'],
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'#'}
        </strong>
      ),
      renderCell: (params: GridColumn) => (
        <>
        <div style={{textAlign:'center'}}>
          <strong>
            {params.value}
          </strong>
        </div>
        </>
      ),
    },
  
    {field: 'name', headerName: 'Name', minWidth: 150, description:
      'The identification used by the person with access to the online service.', 
      headerClassName:'Column-header', hide: hides['name'],
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Name '}
        </strong>
      ),
      renderCell: (params: GridColumn) => (
        <strong>
          {params.value}
        </strong>
      ),
    },
  
    {field: 'symbol', headerName: 'Symbol', minWidth: 100 , 
    headerClassName:'Column-header', hide: hides['symbol'],
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Symbol'}
        </strong>
      ),
    },
  
    {
      field: 'address', headerName: 'Address', minWidth: 150 ,
      headerClassName:'Column-header',
      headerAlign:'center', hide: hides['address'],
      renderCell: (params) => (
        <a href={"https://etherscan.io/token/" + params.value} target="_blank">
          <img src={eth_icon} style={{height: '20px'}}/>
        </a>
      ),
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Address'}
        </strong>
      ),
    },
  
    {
      field: 'age', headerName: 'Age', minWidth: 60 ,
      headerClassName:'Column-header',  hide: hides['age'],
      renderCell: (params) => {
        <font color='red'>params.value</font>
      },
      valueFormatter: (params) => {
        const valueFormatted = getAge(params.value);
        return `${valueFormatted}`;
      },
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Age'}
        </strong>
      ),
    },
  
    {
      field: 'marketcap', headerName: 'MarketCap', minWidth: 130 ,
      headerClassName:'Column-header', hide: hides['marketcap'],
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'MarketCap'}
        </strong>
      ),
    },
  
    {
      field: 'price', headerName: 'Price', minWidth: 150, 
      headerClassName:'Column-header', hide: hides['price'],
        valueFormatter:(params) => {
            const valueFormatted = params.value;
              return `$${valueFormatted}`;
        },
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>
              {'Price'}
            </strong>
        ),
    },
  
    {
      field: 'decimalPrice', headerName: 'Decimal Price', minWidth: 150, 
      headerClassName:'Column-header', hide: hides['decimalPrice'],
      valueGetter:(params) => {
          var value = params.getValue(params.id, 'price');
          value = decimalPrice(Number(value));
            return `$${value}`;
      },
      renderHeader: (params: GridColumnHeaderParams) => (
          <strong>
            {'Decimal Price'}
          </strong>
      ),
    },
  
    {
      field: 'pricies0',
      headerName: 'Price % variation for 30m',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: true,
      hide: hides['pricies0'],
      renderCell: (params) => renderGraphCell(params, 0),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'30m %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'pricies1',
      headerName: 'Price % variation for 1h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['pricies1'],
      renderCell: (params) => renderGraphCell(params, 1),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'pricies2',
      headerName: 'Price % variation for 3h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['pricies2'],
      renderCell: (params) => renderGraphCell(params, 2),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'3h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'pricies3',
      headerName: 'Price % variation for 6h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['pricies3'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'6h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'pricies4',
      headerName: 'Price % variation for 1d',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['pricies4'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1d %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'pricies5',
      headerName: 'Price % variation for 1 week',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['pricies5'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1 week %'}
          </strong>
      </>
      ),
    },
   
    {
      field: 'transaction', headerName: 'Number Transaction', minWidth: 80 ,
      headerClassName:'Column-header',
      hide: hides['transaction'],
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Trans.'}
        </strong>
      ),
    },
  
  
    {
      field: 'transactions0',
      headerName: 'transaction % variation for 30m',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['transactions0'],
      renderCell: (params) => renderGraphCell(params, 0),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'30m %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'transactions1',
      headerName: 'transaction % variation for 1h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['transactions1'],
      renderCell: (params) => renderGraphCell(params, 1),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'transactions2',
      headerName: 'transaction % variation for 3h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['transactions2'],
      renderCell: (params) => renderGraphCell(params, 2),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'3h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'transactions3',
      headerName: 'transaction % variation for 6h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['transactions3'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'6h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'transactions4',
      headerName: 'transaction % variation for 1d',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['transactions4'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1d %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'transactions5',
      headerName: 'transaction % variation for 1 week',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['transactions5'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1 week %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'holders', headerName: 'Number Holders', minWidth: 80,
      headerClassName:'Column-header',
      hide: hides['holders'],
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Holders'}
        </strong>
      ),
    },
  
    {
      field: 'allholders0',
      headerName: 'holder % variation for 30m',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['allholders0'],
      renderCell: (params) => renderGraphCell(params, 0),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'30m %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'allholders1',
      headerName: 'holder % variation for 1h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['allholders1'],
      renderCell: (params) => renderGraphCell(params, 1),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'allholders2',
      headerName: 'holder % variation for 3h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['allholders2'],
      renderCell: (params) => renderGraphCell(params, 2),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'3h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'allholders3',
      headerName: 'holder % variation for 6h',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['allholders3'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'6h %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'allholders4',
      headerName: 'holder % variation for 1d',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['allholders4'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1d %'}
          </strong>
      </>
      ),
    },
  
    {
      field: 'allholders5',
      headerName: 'holder % variation for 1 week',
      headerClassName:'Column-header',
      minWidth: 180,
      sortable: false,
      hide: hides['allholders5'],
      renderCell: (params) => renderGraphCell(params),
      renderHeader: (params: GridColumnHeaderParams) => (
        <>
          <strong>
            {'1 week %'}
          </strong>
      </>
      ),
    },
  ];
} 

function decimalPrice(price) {
  if (price === 0) return '0';
  var zero_count = 0, str;
  while (price < 0.1) {
    price *= 10;
    zero_count++;
  }
  
  if (price >= 1) {
    str = price.toString();
    
    let zero_position = str.indexOf('.');
    if (zero_position) {
      str = str.substr(0, zero_position) + "." + str.substr(zero_position + 1, 3)
    }
  } else {
    str = price.toString();
    
    str = str.substr(2, 3);
    str = '+' + zero_count + ', ' + str;
  }
  
  return str;
}
  
function convertVal(val) {
  var retArrary = [];
  for(let i = 0; i < val.length; i++) {
    retArrary.push(val[i])
  } 
    
  return retArrary;
}

function calculatePercentage(val, mode = 3) {
  var offset = 0
  var percentage = 0
  switch(mode) {
    case 0:
      offset = 16
      break
    case 1:
      offset = 30
      break
    case 2:
      offset = 90
      break
    default:
      offset = 180
      break
  }
  var pastVal = parseFloat(val[val.length > offset ? val.length - offset : 0])
  var curVal = parseFloat(val[val.length - 1])
  if (!(pastVal === 0))
    percentage = (100 * ((curVal - pastVal)/pastVal)).toFixed(2)
  else if (curVal === 0)
    percentage = 0
  else
    percentage = curVal * 100
    
  return percentage
}
  
function getAge(dateString) 
{
    var todayInMilli = Math.round(new Date() / 1000);
    var sec_num = todayInMilli - Math.round(new Date(dateString) / 1000);
    
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+'h '+minutes + 'm';
    
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], 
            cellValue: Home.getValueToDisplay(props),
            seconds : 0,
            sort: 'p_0',   /// price
            email_percentage: 10,   /// 10% by default
            columnHides: []
        };
    }

       // update cellValue when the cell's props are updated
    static getDerivedStateFromProps(nextProps) {
      return {
        cellValue: Home.getValueToDisplay(nextProps)
      };
    }

   static getValueToDisplay(params) {
      return params.valueFormatted ? params.valueFormatted : params.value;
  }


    checkStates = () =>{
        this.setState({ data: [] });
    }
    tick() {
      this.loadCoinListings()
      this.setState(state => ({
        seconds: state.seconds + 120
      }));
    }
  
    componentDidMount() {
      Api.getColumnVisibles().then(res => {
        let hides = {}
        res.data.forEach(item => {
          if (!item['visible']) hides[item['column']] = true;
        })

        this.setState({columnHides: hides})
      })
      Api.getSetting({key: 'email_percentage'}).then(res => {
        this.setState({email_percentage: res.data.value ? Number(res.data.value): 10})
      })
      Api.getSetting({key: 'default_sort'}).then(res => {
        this.setState({sort: res.data.value ? res.data.value : 'p_0'});

        this.loadCoinListings()
        this.interval = setInterval(() => this.tick(), 120000);
      })
      
    }
  

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    loadCoinListings() {
        Api.getCoinListings().then(res => {
          //// from here sort
          let coin_listings = res.data;
          let sort = this.state.sort;

          const comparer = (a, b) => {

            let a_val, b_val;
            switch(sort) {
              case 'p_0':
                a_val = calculatePercentage(a.pricies0, 0); b_val = calculatePercentage(b.pricies0, 0);
                break;
              case 'p_1':
                a_val = calculatePercentage(a.pricies1, 1); b_val = calculatePercentage(b.pricies1, 1);
                break;
              case 'p_2':
                  a_val = calculatePercentage(a.pricies2, 2); b_val = calculatePercentage(b.pricies2, 2);
                  break;
              case 'p_3':
                  a_val = calculatePercentage(a.pricies3); b_val = calculatePercentage(b.pricies3);
                  break;
              case 'p_4':
                  a_val = calculatePercentage(a.pricies4); b_val = calculatePercentage(b.pricies4);
                  break;
              case 'p_5':
                  a_val = calculatePercentage(a.pricies5); b_val = calculatePercentage(b.pricies5);
                  break;

              case 't_0':
                  a_val = calculatePercentage(a.transactions0, 0); b_val = calculatePercentage(b.transactions0, 0);
                  break;
              case 't_1':
                  a_val = calculatePercentage(a.transactions1, 1); b_val = calculatePercentage(b.transactions1, 1);
                  break;
              case 't_2':
                  a_val = calculatePercentage(a.transactions2, 2); b_val = calculatePercentage(b.transactions2, 2);
                  break;
              case 't_3':
                  a_val = calculatePercentage(a.transactions3); b_val = calculatePercentage(b.transactions3);
                  break;
              case 't_4':
                  a_val = calculatePercentage(a.transactions4); b_val = calculatePercentage(b.transactions4);
                  break;
              case 't_5':
                  a_val = calculatePercentage(a.transactions5); b_val = calculatePercentage(b.transactions5);
                  break;


              case 'h_0':
                  a_val = calculatePercentage(a.allholders0, 0); b_val = calculatePercentage(b.allholders0, 0);
                  break;
              case 'h_1':
                  a_val = calculatePercentage(a.allholders1, 1); b_val = calculatePercentage(b.allholders1, 1);
                  break;
              case 'h_2':
                  a_val = calculatePercentage(a.allholders2, 2); b_val = calculatePercentage(b.allholders2, 2);
                  break;
              case 'h_3':
                  a_val = calculatePercentage(a.allholders3); b_val = calculatePercentage(b.allholders3);
                  break;
              case 'h_4':
                  a_val = calculatePercentage(a.allholders4); b_val = calculatePercentage(b.allholders4);
                  break;
              case 'h_5':
                  a_val = calculatePercentage(a.allholders5); b_val = calculatePercentage(b.allholders5);
                  break;
                  
              default:
                a_val = b_val = 0;
            }

            return Number(a_val) < Number(b_val) ? 1 : -1;
            
          };
          let result = coin_listings.sort(comparer);


          this.setState((state) =>{
              return {isLoaded: true,
              data: result};
          })

          this.sendEmails(result);
        })
    }

    sendEmails(coin_listing) {
      for (let i=0; i < coin_listing.length; i++) {
        let item = coin_listing[i];

        let percentage = Number(calculatePercentage(item.pricies2));

        if (percentage > this.state.email_percentage) {
          Api.sendEmail({
            entry_id: item.entry_id,
            address: item.address,
            name: item.name,
            symbol: item.symbol,
            percentage: percentage,
            price: item.price
          })
        }
      }
    }

    columnVisibilityChange(params, event) {
      console.log(params, event);
      Api.columnVisibleChange({
        column: params.field,
        visible: params.isVisible ? 1: 0
      }).then(res => {
        console.log(res);
      })
    }
    
    render() {
        return (
            <div>
                <Header />
                <Container>
                <div className="pt-3">
                    <div class='GridShow' style={{width:'100%'}}>
                        <DataGrid autoHeight  components={{Toolbar: GridToolbar,}} density="compact"
                          rows={this.state.data} columns={columns(this.state.columnHides)} disableColumnMenu 
                          onColumnVisibilityChange	={this.columnVisibilityChange} onColumnsChange={(params, event) => {
                            console.log(params)
                          }}/>                        
                    </div>
                </div>
                </Container>
            </div>
        )
    }
}

export default Home;
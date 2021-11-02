import React, {useState} from 'react';
import Header from '../../layout/header';
import Api from '../../helper/api';
import "@grapecity/wijmo.styles/wijmo.css";
import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import {Container} from 'react-bootstrap';
import LongMenu from './menu';

const renderGraphCell = function(params) {
  return (
    <>
      <div style={{width:'65%'}}>
        <Sparklines
            data={convertVal(params.value)}
            margin={6}
            height={40}
            width={200}
            >
            <SparklinesLine
                style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
            />
          
        </Sparklines>
      </div>
      <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
        <font style={{color:calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208"}}>
        {calculatePercentage(params.value, 0) >= 0? ' + ':' '} {calculatePercentage(params.value, 0)} %
        </font>
      </div>
    </>
  )
}

const columns : GridColDef[] = [
  {field: 'id', headerName: 'id', width: '30' ,description:
    'The identification used by the person with access to the online service.', 
    headerClassName:'Column-header',
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

  {field: 'name', headerName: 'Name', minWidth: 220, description:
    'The identification used by the person with access to the online service.', 
    headerClassName:'Column-header',
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
  headerClassName:'Column-header',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>
        {'Symbol'}
      </strong>
    ),
  },

  {
    field: 'address', headerName: 'Address', minWidth: 350 ,
    headerClassName:'Column-header',
    headerAlign:'center',
    renderCell: (params) => (
      <a href={"https://etherscan.io/token/" + params.value} target="_blank">{params.value}</a>
    ),
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>
        {'Address'}
      </strong>
    ),
  },

  {
    field: 'age', headerName: 'Age', minWidth: 60 ,
    headerClassName:'Column-header', 
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
    headerClassName:'Column-header',
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>
        {'MarketCap'}
      </strong>
    ),
  },

  {
    field: 'price', headerName: 'Price', minWidth: 150, 
    headerClassName:'Column-header',
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
    field: 'pricies0',
    headerName: 'Price % variation for 30m',
    headerClassName:'Column-header',
    minWidth: 180,
    sortable: true,
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 0) >= 0? ' + ':' '} {calculatePercentage(params.value, 0)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 1) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 1) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 1) >= 0? ' + ':' '} {calculatePercentage(params.value, 1)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 2) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 2) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 2) >= 0? ' + ':' '} {calculatePercentage(params.value, 2)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 0) >= 0? ' + ':' '} {calculatePercentage(params.value, 0)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 1) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 1) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 1) >= 0? ' + ':' '} {calculatePercentage(params.value, 1)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 2) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 2) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 2) >= 0? ' + ':' '} {calculatePercentage(params.value, 2)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 0) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 0) >= 0? ' + ':' '} {calculatePercentage(params.value, 0)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 1) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 1) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 1) >= 0? ' + ':' '} {calculatePercentage(params.value, 1)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value, 2) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value, 2) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value, 2) >= 0? ' + ':' '} {calculatePercentage(params.value, 2)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%", textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
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
    renderCell: (params) => (
        <>
        <div style={{width:'65%'}}>
          <Sparklines
              data={convertVal(params.value)}
              margin={6}
              height={40}
              width={200}
              >
              <SparklinesLine
                  style={{ strokeWidth: 5, stroke: calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208", fill: "none" }}
              />
            
          </Sparklines>
          </div>
          <div style={{width:"20%", paddingLeft:"5%",textAlign: "right",fontSize:12,fontweight: "bold"}}>
            <font style={{color:calculatePercentage(params.value) >= 0 ? "#2fa608":"#c71208"}}>
            {calculatePercentage(params.value) >= 0? ' + ':' '} {calculatePercentage(params.value)} %
            </font>
          </div>
          </>
    ),
    renderHeader: (params: GridColumnHeaderParams) => (
      <>
        <strong>
          {'1 week %'}
        </strong>
    </>
    ),
  },
];
  
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
      this.loadCoinListings()
      this.interval = setInterval(() => this.tick(), 30000);
    }
  

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    loadCoinListings() {
        Api.getCoinListings().then(res => {
            this.setState((state) =>{
                return {isLoaded: true,
                data: res.data};
            })  
        })
    }
    
    render() {
        return (
            <div>
                <Header />
                <Container>
                <div className="pt-3">
                    <div class='GridShow' style={{width:'100%'}}>
                        <DataGrid autoHeight  components={{Toolbar: GridToolbar,}} 
                          rows={this.state.data} columns={columns} disableColumnMenu />                        
                    </div>
                </div>
                </Container>
            </div>
        )
    }
}

export default Home;
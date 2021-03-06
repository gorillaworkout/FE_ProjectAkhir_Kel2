import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import { API_URL_SQL } from '../../helpers/apiUrl';
import moment from 'moment';
import numeral from 'numeral'
import ReactImageMagnify from 'react-image-magnify';
import HeaderAdmin from '../../components/header/headerAdmin';
import {FaUserCog,FaMoneyCheckAlt} from 'react-icons/fa'
import './user.css'
import { Pagination,PaginationItem, PaginationLink } from 'reactstrap';
import { TableFooter } from '@material-ui/core';
import {Button} from 'reactstrap'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  subcontainer:{
      height:200
  }
});

const AdminPayment=()=>{
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [paymentInWaiting,setPaymentInWaiting]=useState([])
  const [pages,setpages]=useState(1)
  const [maxpages,setmaxpages]=useState(0)

  useEffect(()=>{
    console.log(pages)
    Axios.get(`${API_URL_SQL}/payment/getpaymentwaiting`)
    .then((res)=>{
      console.log(res.data)
      setmaxpages(res.data.length)
    }).catch((err)=>{
      console.log(err)
    })

    Axios.get(`${API_URL_SQL}/payment/getpaymentwaiting?page=${pages}`)
    .then((res)=>{
        console.log(res)
        setPaymentInWaiting(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    console.log(pages)
    Axios.get(`${API_URL_SQL}/payment/getpaymentwaiting?page=${pages}`)
    .then((res)=>{
        console.log(res)
        setPaymentInWaiting(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[pages])

  const onConfirmClick=(payment_id,transaksi_id)=>{
    Axios.post(`${API_URL_SQL}/payment/confirmpayment`,{payment_id:payment_id,transaksi_id:transaksi_id})
    .then((res)=>{
        console.log(res)
        setmaxpages(res.data.length)
        Axios.get(`${API_URL_SQL}/payment/getpaymentwaiting?page=${pages}`)
        .then((res)=>{
            console.log(res)
            setPaymentInWaiting(res.data)
        }).catch((err)=>{
          console.log(err)
        })
        setPaymentInWaiting(res.data)
    })
  }

  const renderTable=()=>{
    return paymentInWaiting.map((val,index)=>{
      return(
        <TableRow key={val.payment_id} className={classes.subcontainer}>
            <TableCell style={{width:130}} align="center">{val.payment_id}</TableCell>
            <TableCell style={{width:130}} align="center">{val.transaksi_id}</TableCell>
            <TableCell style={{width:200}}>
              <div style={{maxWidth:'200px'}}>
                <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Payment',
                            isFluidWidth: true,
                            src: API_URL_SQL+val.image
                        },
                        largeImage: {
                            src: API_URL_SQL+val.image,
                            width: 600,
                            height: 600
                        },
                        enlargedImageContainerDimensions:{
                            width:"300%",
                            height:"130%"
                        }
                    }} />
                {/* <img width='100%' height='100%' src={val.image} alt={val.namatrip}/> */}
              </div>
            </TableCell>
            <TableCell style={{width:170}} align="center">{moment(val.tanggaltransaksi).format('Do MMMM YYYY')}</TableCell>

            <TableCell style={{width:160}} align="center">Rp {numeral(val.totalpayment).format('0,0.0')}</TableCell>
            <TableCell style={{width:110}} align="center">
              <Button color="primary" onClick={()=>onConfirmClick(val.payment_id,val.transaksi_id)}>Confirm</Button>
            </TableCell>
        </TableRow>
      )
    })
  }
  const pindahpage=(a)=>{
    console.log(a)
    setpages(a)
  }
  const renderpaging=()=>{
    console.log("jalan")
    console.log(maxpages)
    var jumlahpage=Math.ceil(maxpages/3)
    var arr=new Array(jumlahpage)
    console.log(jumlahpage)
    console.log(arr)
    for(let i=0;i<arr.length;i++){
      if((i+1)===pages){
        arr[i]=(<PaginationItem key={i} disabled>
                  <PaginationLink>
                    {i+1}
                  </PaginationLink>
                </PaginationItem>)
      }else{
        console.log(i)
        arr[i]=(
          <PaginationItem key={i} onClick={()=>pindahpage(i+1)}>
                <PaginationLink>
                  {i+1}
                </PaginationLink>
              </PaginationItem>
        )
      }
    }
    return arr
  }

  return (
    <>
      <div className="user-container">
        <HeaderAdmin/>
        <div style={{marginLeft:100,width:"100%"}}>
          <div>
            <div style={{
                display:"flex",
                alignItems:"center",
                color:"#318ae7",
                padding:20,
                borderBottom:"5px solid whitesmoke"
                
            }}>
              <div>
                  <FaMoneyCheckAlt className="icon-user" color={"#318ae7"}/>
              </div>
              <div>
                  <span style={{
                      fontWeight:'bold',
                      fontSize:20,

                  }}>Report</span>
              </div>
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                    <TableCell align="center">Payment Id</TableCell>
                    <TableCell align="center">Transaksi Id</TableCell>
                    <TableCell align="center">Bukti Transfer</TableCell>
                    <TableCell align="center">Tgl Transaksi</TableCell>

                    <TableCell align="center">Total Harus Dibayar</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {renderTable()}
              </TableBody>
            </Table>
            <Pagination style={{display:"flex", justifyContent:"center",width:"100%"}}>
              {renderpaging()}
            </Pagination>
          </TableContainer>

        </div>
    </div>
  </>
    

  );
}
 
export default AdminPayment;
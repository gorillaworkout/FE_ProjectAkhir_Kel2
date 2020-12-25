import React, { Component } from 'react';
import './productDetail.css'
import {connect} from 'react-redux';
import {AiOutlineLogout,AiFillHome,AiFillDelete,AiOutlineHeart,AiOutlineShareAlt,AiFillStar} from 'react-icons/ai'
import Logo from './../../assets/logo.png'
import {BiPlus,BiMinus,BiCart,BiUser} from 'react-icons/bi'
import {Dropdown} from 'react-bootstrap'
import Parcel1 from './../../assets/parcel1.jpg'
import Axios from 'axios'
import { API_URL_SQL } from '../../helpers/apiUrl';
import { FullPageLoading } from './../../components/loading';
import { Link } from 'react-router-dom'
import {BsCheck} from 'react-icons/bs'
class ProductDetail extends Component {
    state = { 
        dataParcel:[],
        loading:true
     }

     componentDidMount(){
        Axios.get(`${API_URL_SQL}/product/getDataParcelById/10`)
        .then((res)=>{
            console.log(res.data,' res data')
            this.setState({dataParcel:res.data,loading:false})
        }).catch((err)=>{
            console.log(err)
        })
     }

     renderProduct=()=>{
         return this.state.dataParcel.map((val,index)=>{
            return (
                <>
                    <li>{val.qty} {val.namaProduct}</li>
                </>
            )
         })
     }



    render() { 
        
        if(this.state.loading){
            return (
                <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                    {FullPageLoading(this.state.loading,100,'#0095DA')}
                </div>

            )
        }
        return ( 
            <>
                <h1>Product Details</h1>
                <div className="pd-outer">
                <div className="header-top d-flex bd-highlight">
                        <div className="div-img p-2 flex-grow-1 bd-highlight">
                            <img src={Logo} alt="Logo" className="logo-header"/>    
                        </div>
                        
                        {
                        this.props.isLogin?
                            <div className="icon-user  ">
                                <Dropdown style={{marginRight:'10px', marginTop:'-5px'}}>
                                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                        <BiUser color="white" size="20" style={{cursor:"pointer", marginRight:'5px'}}/> 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item href="/useraccount">
                                                <BiCart color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                                My Account
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-1" onClick={this.onLogoutClick}>
                                            <AiOutlineLogout color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            Logout
                                            </Dropdown.Item>
                                        <Dropdown.Item href="/cart">
                                                <BiCart color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                                Cart
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/">
                                            <AiFillHome color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                            Home                         
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <p style={{fontSize:'15px', marginTop:'10px',color:'white'}}>
                                Hallo, {this.props.nama}</p>
                            
                            </div>
                    :
                            <div className="icon-user  ">
                                <Dropdown style={{marginRight:'10px', marginTop:'-5px'}}>
                                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                        <BiUser color="white" size="20" style={{cursor:"pointer", marginRight:'5px'}}/> 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                            <Dropdown.Item href="/login" >
                                            <AiOutlineLogout color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            Login
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/">
                                            <AiFillHome color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                            Home                         
                                            </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                             </div>
                    }
                    </div>   
                    <div className="product-header">
                        <div className="product-kiri">
                            <div className="img-kiri">
                                <img src={Parcel1} alt="asd" style={{height:'300px', width:'400px'}}/>
                            </div>
                            <div className="favorite">
                                <div className="fav-kiri">
                                    <AiOutlineHeart color="#0984e3" size="25" style={{cursor:"pointer", marginRight:'10px'}}/>
                                    <p>Favoritkan</p>
                                </div>
                                <div className="fav-kanan">
                                    <AiOutlineShareAlt color="#0984e3" size="25" style={{cursor:"pointer", marginRight:'10px'}}/>
                                    <p>Bagikan</p>
                                </div>
                            </div>
                        </div>
                        <div className="product-kanan">
                            <div className="product-div-kiri">
                                <div className="prod-kanan">
                                    <p style={{fontSize:'30px'}}>{this.state.dataParcel[0].namaParcel}</p>
                                    <div className="star">
                                        <div>
                                            <AiFillStar color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            <AiFillStar color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            <AiFillStar color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            <AiFillStar color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            <AiFillStar color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                        </div>
                                        <p>490 Ulasan</p>
                                    </div>
                                </div>
                                <div className="harga">
                                    <p style={{fontSize:'20px',fontWeight:'600'}}>Rp .{this.state.dataParcel[0].harga}</p>
                                    
                                    <p>Tersedia  10 Stok Parcel</p>
                                </div>

                                

                                <div className="information-product">
                                    {/* <div className="description">
                                        <p style={{fontSize:'25px'}}>Description:</p>
                                        <p style={{fontSize:'20px',marginLeft:'10px',marginTop:'5px'}}>Parcel Sehat murah</p>
                                    </div> */}

                                    <p style={{fontSize:'20px',fontWeight:'600'}}>Custom Your Parcel:</p>
                                    <ul>
                                    {this.renderProduct()}
                                    </ul>
                                </div>

                                <div className="button-div">
                                    <Link to={'/detailparcel/'+this.props.match.params.id}>
                                        <div className="button-beli">
                                            <p>Beli</p>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                            <div className="product-div-kanan">
                                        <div className="lay-prod">
                                            <p>Layanan Product</p>
                                        </div>
                                        <div style={{paddingLeft:'20px',paddingTop:'20px'}}>
            
                                                <p><BsCheck style={{color:'green',fontSize:'25px'}}/> Cash On Delivery</p> 
                                                <p><BsCheck style={{color:'green',fontSize:'25px'}}/>Cash On Pickup</p>
                                                <p><BsCheck style={{color:'green',fontSize:'25px'}}/>Ambil di Toko</p>
                                                <p><BsCheck style={{color:'green',fontSize:'25px'}}/>GO-JEK</p>
                                            
                                        </div>
                            </div>

                        </div>
                    </div>


                </div>
            </>
         );
    }
}

const MapStatetoprops=({Auth,cart})=>{
    return {
        ...Auth
    }
}

export default (connect(MapStatetoprops,{})(ProductDetail))
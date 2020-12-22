import React, { Component } from 'react';
import './productDetail.css'
import {connect} from 'react-redux';
import {AiOutlineLogout,AiFillHome,AiFillDelete,AiOutlineHeart,AiOutlineShareAlt,AiFillStar} from 'react-icons/ai'
import Logo from './../../assets/logo.png'
import {BiPlus,BiMinus,BiCart,BiUser} from 'react-icons/bi'
import {Dropdown} from 'react-bootstrap'
class ProductDetail extends Component {
    state = {  }
    render() { 
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
                                <img src={Logo} alt="asd" style={{height:'200px', width:'400px'}}/>
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
                            <div className="prod-kanan">
                                <p style={{fontSize:'30px'}}>Pocari Sweat Botol 350ml</p>
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
                                <p>Rp 8.000</p>
                                
                                <p>Tersedia > 10 Stok Barang</p>
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
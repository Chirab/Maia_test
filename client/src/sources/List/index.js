import React, {useState, useEffect} from 'react';
import {
    MDBListGroup,
    MDBListGroupItem,
    MDBContainer,
    MDBBadge,
    MDBBtn,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput
} from "mdbreact";
import "./index.css";
import axios from "axios";

const AddButton = () => {

    const [modal, setModal] = useState(false);
    const [newProduct, setNewProduct] = useState("");

    const toggle = () => { setModal(!modal) }

    function refreshPage() {
        window.location.reload(false);
    }

    async function sendNewProduct(e) {
        e.preventDefault();
        const newData = { newProduct : newProduct};
        try {
            axios.post("http://localhost:4000/product/addNewProduct", newData)
                .then(res => {
                    if (res.status === 200)
                        refreshPage();
                })
                .catch(err => console.log(err));
        }
        catch  {
            console.log("error")
        }
    }

    return (
        <div>
            <MDBBtn color="primary" onClick={toggle}>
                <MDBIcon icon="plus" className="mr-1" />
            </MDBBtn>
            <form onSubmit={sendNewProduct}>
                <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>Ajouter un produit</MDBModalHeader>
                <MDBModalBody>
                    <MDBInput
                        label="Produit"
                        value={newProduct}
                        onChange={e => setNewProduct(e.target.value)}
                    />
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
                    <MDBBtn color="primary" type="submit">Envoyer</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </form>
        </div>
    )
}

export default function () {
    const [listProduct, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/product/getAllProduct")
            .then(res => {
                setList(res.data);
                console.log(res.data);
            })
            .catch(err =>  console.log(err))
    }, []);


    return (
        <div>
            <MDBContainer className="list">
                <MDBListGroup style={{ width: "30rem" }}>
                    <p style={{fontWeight : "bold", fontSize : "3em"}}>Liste des produits</p>
                    <br/>
                    {listProduct && listProduct.map(item => {
                            return (
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center">{item.product} :   {item.EAN}<MDBBadge color="primary" pill>{item.quantity}</MDBBadge>
                                </MDBListGroupItem>
                            )
                        })}
                </MDBListGroup>
            </MDBContainer>
            <br/>
            <AddButton/>
        </div>
    )
}

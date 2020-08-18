import React, {useState} from 'react';
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

    async function sendNewProduct(e) {
        e.preventDefault();
        const newData = { newProduct : newProduct};
        try {
            axios.post("http://localhost:4000/product/addNewProduct", newData)
                .then(res => {
                    console.log(res)
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
    return (
        <div>
            <MDBContainer className="list">
                <MDBListGroup style={{ width: "30rem" }}>
                    <p style={{fontWeight : "bold", fontSize : "3em"}}>Liste des produits</p>
                    <br/>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center">Morbi leo risus<MDBBadge color="primary" pill>1</MDBBadge>
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBContainer>
            <br/>
            <AddButton/>
        </div>
    )
}

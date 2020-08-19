import React, {useState} from "react";
import axios from "axios";
import {MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";

const AddButton = () => {

    const [modal, setModal] = useState(false);
    const [newProduct, setNewProduct] = useState("");
    const [value, setValue] = useState(0);
    const toggle = () => { setModal(!modal) }

    function refreshPage() {
        window.location.reload(false);
    }

    function checkInput() {
        return newProduct.length > 0;
    }

    async function sendNewProduct(e) {
        e.preventDefault();
        const newData = { newProduct : newProduct, quantityProduct : value};
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
                    <MDBModalHeader toggle={toggle}>Ajouter ou Modifier un produit</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            label="Produit"
                            value={newProduct}
                            onChange={e => setNewProduct(e.target.value)}
                        />
                        <MDBInput label="quantité" type="number" value={value} onChange={e => setValue(e.target.value)}/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
                        <MDBBtn color="primary" type="submit" disabled={!checkInput()}>Envoyer</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </form>
        </div>
    )
}

export default AddButton;

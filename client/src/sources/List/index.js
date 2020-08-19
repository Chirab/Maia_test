import React, {useState, useEffect} from 'react';
import {
    MDBListGroup,
    MDBListGroupItem,
    MDBContainer,
    MDBBadge,
    MDBInput,
} from "mdbreact";
import "./index.css";
import axios from "axios";
import AddButton from "../component/AddButton";


export default function () {
    const [listProduct, setList] = useState([]);
    const [search, setSearch] = useState(null);

    useEffect( () => {
        axios.get("http://localhost:4000/product/getAllProduct")
            .then(res => {
                setList(res.data);
                console.log(res.data)
            })
            .catch(err =>  console.log(err))
    }, []);

    const items = listProduct.filter((data) => {
        if (search === null)
            return data;
        else if (data.product.toLowerCase().includes(search.toLowerCase()) || (data.EAN + '').includes(search))
            return data;
    }).map(data => {
        return (
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                {data.product} :   {data.EAN}
                <MDBBadge color="primary" pill>{data.quantity}</MDBBadge>
            </MDBListGroupItem>
        )
    })

    return (
        <div>
            <MDBContainer className="list">
                <MDBListGroup style={{ width: "30rem" }}>
                    <p style={{fontWeight : "bold", fontSize : "3em"}}>Liste des produits</p>
                    <br/>
                    <MDBInput
                        label="Recherche"
                        onChange={e => setSearch(e.target.value)}
                    />
                    <br/>
                    {items}
                </MDBListGroup>
            </MDBContainer>
            <br/>
            <AddButton/>
        </div>
    )
}

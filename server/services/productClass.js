const Product = require('../model/Product');


function codeEAN() {

}

module.exports = class Products {

    constructor() {}

    async sendProduct(newProduct) {
        return new Promise (async(resolve, reject) => {
            try {
                newProduct = newProduct.toLowerCase();
                Product.findOne({product : newProduct})
                    .then(prod => {
                        if (prod)
                            reject();
                        const ean = codeEAN();
                        console.log(ean);
                       /* const Data = new Product({ product : newProduct, EAN : 1234567891234})
                        Data.save()
                            .then(result => {
                                resolve();
                            })
                            .catch(err => {reject()})*/
                    })
                    .catch(err => reject());
            }
            catch {
                reject()
            }
        })
    }

    getProduct() {
        return new Promise( async (resolve, reject) => {
            console.log("k")
        })
    }
}

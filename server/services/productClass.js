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
                    .then(async prod => {
                        if (prod) {
                            await Product.findOneAndUpdate({_id: prod.id}, {$inc: {'quantity': 1}})
                                .then(result => { resolve()})
                                .catch(err => reject())
                        }
                        else {
                            const Data = new Product({product: newProduct, EAN: 1234567891234, quantity: 1})
                            Data.save()
                                .then(result => {
                                    resolve();
                                })
                                .catch(err => {
                                    reject()
                                })
                        }
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
            try {
                Product.find()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject();
                    })
            }
            catch  {
                reject();
            }
        })
    }
}

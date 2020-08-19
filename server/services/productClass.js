const Product = require('../model/Product');


function codeEAN(o) {
        var a = 10,
            b = 'abcdefghijklmnopqrstuvwxyz',
            c = '',
            d = 0,
            e = '' + b;
        if (o) {
            if (o.startsWithLowerCase) {
                c = b[Math.floor(Math.random() * b.length)];
                d = 1;
            }
            if (o.length) {
                a = o.length;
            }
            if (o.includeUpperCase) {
                e += b.toUpperCase();
            }
            if (o.includeNumbers) {
                e += '1234567890';
            }
        }
        for (; d < a; d++) {
            c += e[Math.floor(Math.random() * e.length)];
        }
        return c;
}

module.exports = class Products {

    constructor() {}

    async sendProduct(newProduct, quantityProduct) {
        return new Promise (async(resolve, reject) => {
            try {
                newProduct = newProduct.toLowerCase();
                Product.findOne({product : newProduct})
                    .then(async prod => {
                        if (prod) {
                            await Product.findOneAndUpdate({_id: prod.id}, {$inc: {'quantity': quantityProduct}})
                                .then(result => { resolve(result)})
                                .catch(err => reject(err))
                        }
                        else {
                            const eanNumber = codeEAN({includeUpperCase: true,
                                includeNumbers: true,
                                length: 13,
                                startsWithLowerCase: true
                            });
                            const Data = new Product({product: newProduct, EAN: eanNumber, quantity: quantityProduct})
                            Data.save()
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(err => {
                                    reject(err)
                                })
                        }
                    })
                    .catch(err => reject(err));
            }
            catch(e) {
                reject(e)
            }
        })
    }

    getProduct() {
        return new Promise( async (resolve, reject) => {
            try {
                await Product.find()
                    .then(data => {
                       const result = data.filter(data => data.quantity > 0);
                       resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    })
            }
            catch(e)  {
                reject(e);
            }
        })
    }
}

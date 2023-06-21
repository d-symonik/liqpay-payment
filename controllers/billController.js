const LiqPay = require('../liqpay');

const {BillSchema} = require("../models/Bill");
const {PaymentStatuses} = require("../utils/constants/payment-status");

const ApiError = require("../error/ApiError");

module.exports = {
    sendForm: async (req, res, next) => {
        try {

            const publicKey = process.env.PUBLIC_KEY;
            const privateKey = process.env.PRIVATE_KEY;

            const liqPay = new LiqPay(publicKey, privateKey);

            const billInfo = {
                clientID: '2',
                totalPrice: 440,
            }
            const bill = await BillSchema.create(billInfo);

            const data = {
                action: 'pay',
                amount: 0.1,
                price: bill.totalPrice,
                currency: 'UAH',
                description: `Order #${bill._id}`,
                order_id: bill._id,
                version: '3',
                public_key: publicKey,
                private_key: privateKey,
                server_url: "http://localhost:5000/test/liqpay/result"
            };

            const html = liqPay.cnb_form(data);
            return res.send(html);
        } catch (e) {
            return next(ApiError.internalError(e.message));
        }
    },
    check: async (req, res, next) => {
        try {
            const publicKey = process.env.PUBLIC_KEY;
            const privateKey = process.env.PRIVATE_KEY;
            const liqPay = new LiqPay(publicKey, privateKey);

            // cannot get response from LiqPay after payment so mock data

            //const encodedData = req.body
            //let decodedData = JSON.parse(Buffer.from(encodedData, 'base64').toString());

            const mockOrderID = '649312283f3e404a09316ad0';
            liqPay.api("request", {
                    "action": "status",
                    "version": "3",
                    "order_id": mockOrderID
                },
                async (data) => {
                    if (data.status !== PaymentStatuses.ERROR) {
                        let updatedBill = await BillSchema.findByIdAndUpdate(mockOrderID, {isPaid: true});
                        return res.json(updatedBill)
                    }
                }, (e) => {
                    return next(ApiError.badRequestError(e.message));
                });
        } catch (e) {
            return next(ApiError.internalError(e.message))
        }
    }
}

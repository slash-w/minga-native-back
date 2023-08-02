import mercadopago from "mercadopago";


export const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: process.env.MP_TOKEN
    })

    try{
    const result = await mercadopago.preferences.create({
        items: [
            {
                title: 'Donacion',//req.body.title,
                unit_price: req.body.unit_price,
                currency_id: "ARS",
                quantity: 1,
            }
        ],
        back_urls: {
            success: "http://localhost:5173/",
            failure: "http://localhost:5173/",
            pending: ""
        },
        notification_url: "https://545d-138-59-172-205.ngrok.io/api/payment/webhook",
        auto_return: "approved",
    })
    console.log(result)
    console.log('REQ -->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.body)
    console.log('ENV TOKEN >>>', process.env.MP_TOKEN)
    console.log('it works!!')
    
    console.log('init', result.body.init_point )
    return res.json({message: 'failed', success: false, mp_url: result.body.init_point})
    }
    catch(error){
        console.log(error)
        return res.json({message: 'failed', success: false, mp_url: 'http://localhost:5173/'})
    }

 
}
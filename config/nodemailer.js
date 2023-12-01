import nodemailer from 'nodemailer';


// setup function to send mail
export default async function sendMail(){

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'rathorejaimalbanna@gmail.com',
            pass:'qqnp zevb hbqm udan'
        }
    });

    const mailOption = {
        from:'rathorejaimalbanna@gmail.com',
        to:'rathorejaimalbanna@gmail.com',
        subject:'Password update',
        text:'dear user to update your password click on the giver link'
    };

    try{
        await transporter.sendMail(mailOption);
        console.log('mail send successfully')
    }
    catch(err)
    {
        console.log('error while sending mail:'+err)
    };
};

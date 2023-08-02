import {connect} from 'mongoose';

connect(process.env.LINK_DB)
    .then(() => console.log('Connected to database'))
    .catch(error => console.log(error))
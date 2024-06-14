import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const withHook = (Component) => {
    return (props) => {
        const navigation = useNavigate();
        const params = useParams();
        return <Component navigation={navigation} params={params} {...props} />
    }
}

export default withHook;
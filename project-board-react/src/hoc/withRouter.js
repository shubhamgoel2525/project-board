import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    const history = useNavigate();

    return (
        <WrappedComponent {...props} params={params} history={history} />
    );
};

export default withRouter;

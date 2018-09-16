import bulma from 'bulma/css/bulma.css';
import React from 'react';

const NotFound = () => (
    <div style={{ textAlign: 'center' }} className={[bulma['notification'], bulma['is-danger']].join(' ')}>
        Page Not Found
    </div>
);

export default NotFound;

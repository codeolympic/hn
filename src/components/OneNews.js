import React from 'react'

const OneNews = ({ title, created, author, link }) => (
      <li>
        <div>
            <h3>{title}</h3>
            <p>{created}</p>
            <p>{author}</p>
            <p>{link}</p>
        </div>
      </li>
);

export default OneNews;

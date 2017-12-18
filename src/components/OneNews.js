import React from 'react'

const OneNews = ({ title, created, link }) => (
      <li>
        <div>
            <h3>{title}</h3>
            <p>{created}</p>
            <a href={link}>{link}</a>
        </div>
      </li>
);

export default OneNews;

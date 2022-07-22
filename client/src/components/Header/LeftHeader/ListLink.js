import React from 'react';
import { Link } from "react-router-dom";

function ListLink ({ li_id, link_url, img_src_url, link_text}) {
  return (
    <li id={li_id}>
        <Link to={link_url}>
            <img alt={li_id} src={"/imgs/headers/" + img_src_url + ".png"}/>
            <p>{link_text}</p>
        </Link>
    </li>
  )
}

export default ListLink
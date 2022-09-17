import React    from 'react';
import { Link } from "react-router-dom";

function ListLink ({ link_url, img_src_url, link_text}) {
  return (
    <li>
        <Link to={link_url}>
            <img alt={link_text + "-icon"} src={"/imgs/headers/" + img_src_url + ".png"}/>
            <p>{link_text}</p>
        </Link>
    </li>
  )
}

export default ListLink
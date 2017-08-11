import React from 'react';

export default  (props) => ( props.checked ? <input type="checkbox" name={props.name} checked="checked" value="on" onClick={() => props.onclick() } /> : <input type="checkbox" name={props.name} onClick={() => props.onclick() } />)
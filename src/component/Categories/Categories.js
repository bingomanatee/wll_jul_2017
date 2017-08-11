import React from 'react';
import './Categories.css';
import {Actions} from 'jumpsuit';
import cleanDirectory from '../../utils/cleanDirectory';

export default  (props) => {
  return (<div className="Admin">
      <div className="Admin__frame">
        <h1 className="pageHeader"><a onClick={() => Actions.goAdmin()}>Admin</a>: Categories</h1>
        <table className="pure-table" style={({width: '100%'})}>
          <thead>
          <tr>
            <th>
              Title
            </th>
            <th>
              Path
            </th>
            <th className="table-cell-bin">Order</th>
            <th className="table-cell-bin">Published?</th>
            <th className="table-cell-button">&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {props.directories && (
            props.directories.map((directory, i) => (  <tr key={`cat-dir-${directory.directory}-${i}`}>
              <td>{directory.title}</td>
              <td>{cleanDirectory(directory.directory)}</td>
              <td className="table-cell-bin">{directory.order}</td>
              <td className="table-cell-bin">{directory.published ? 'Yes' : 'No'}</td>
              <td className="table-cell-button">
                <button className="pure-button" onClick={() => Actions.goEditCategory(directory.directory)}>
                  Edit
                </button>
              </td>
            </tr>))
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
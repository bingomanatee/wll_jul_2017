import React from 'react';
import './Categories.css';
import {Actions} from 'jumpsuit';
import _ from 'lodash';
import ClickEditNumber from '../../containers/ClickEditNumber/ClickEditNumber';

const rowClass = (category) => category.published ? '' : 'table-row-disabled';
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
            <th className="table-cell-bin">Sequence</th>
            <th className="table-cell-int">Articles</th>
            <th className="table-cell-bin">Published?</th>
            <th className="table-cell-button">&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {props.directories && (
            _(props.directories).sortBy('sequence').map((category, i) => (
              <tr key={`cat-dir-${category.directory}-${i}`} className={rowClass(category)}>
              <td>{category.title}</td>
              <td>{category.directory}</td>
              <td className="table-cell-int"><ClickEditNumber value={category.sequence}
                                                              updateValue={(sequence) => Actions.articleState.setCategorySequence({category, sequence})} /></td>
              <td className="table-cell-int">{category.article_count}</td>
              <td className="table-cell-bin">{category.published ? 'Yes' : 'No'}</td>
              <td className="table-cell-button">
                <button className="pure-button" onClick={() => Actions.goEditCategory(category.directory)}>
                  Edit
                </button>
              </td>
            </tr>)).value()
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
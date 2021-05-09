import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                {
                    Object.entries(this.props.emotions).map((value) => {
                        return <tr><td>{value[0]}</td><td>{value[1]}</td></tr>
                    })
                }  
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
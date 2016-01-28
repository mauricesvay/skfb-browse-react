var React = require('react');
var Model = require('./Model');

var Grid = React.createClass({

    renderLoadMore: function() {
        if (this.props.isLoading) {
            return <button onClick={this.props.loadMoreHandler} disabled="disabled">Loading</button>
        } else {
            return <button onClick={this.props.loadMoreHandler}>Load more</button>
        }
    },

    render: function() {

        var items = this.props.models.map((model) => {
            return (
                <Model
                    key={model.urlid}
                    model={model}
                    mouseOverHandler={this.props.mouseOverHandler}
                    clickHandler={this.props.clickHandler}
                ></Model>
            );
        });

        return (
            <div>
                <ul className="grid">
                    {items}
                </ul>
                <div style={{padding: '10px', clear: 'both', textAlign: 'center'}}>
                    {this.renderLoadMore()}
                </div>
            </div>
        );
    }
});

module.exports = Grid;

import React from "react";
import ReactList from "react-list";
import axios from "axios";
import { requestModels } from "../actions/actions";
import Model from "./ModelCard";

var scrollTop = 0;

class Grid extends React.Component {
    componentWillMount() {
        this.fetchModels();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.match.params.category != prevProps.match.params.category
        ) {
            this.fetchModels();
        }
        if (this.props.location.search != prevProps.location.search) {
            this.fetchModels();
        }
    }

    fetchModels() {
        if (this.props["requestModels"] && this.props.models.length === 0) {
            this.props.requestModels();
        }
    }

    handleScroll(e) {
        const [firstVisibleIndex, lastVisibleIndex] = this.refs[
            "list"
        ].getVisibleRange();
        var isScrollingDown = e.target.scrollTop - scrollTop > 0;
        var isAtBottom = lastVisibleIndex >= this.props.models.length - 1;

        if (isScrollingDown && isAtBottom) {
            this.loadMore();
        }
    }

    loadMore() {
        var nextCursor;
        if (this.props.nextCursor) {
            nextCursor = this.props.nextCursor;
        }
        this.props.requestModels(nextCursor);
    }

    handleModelClick(e) {
        if (!(e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            var id = e.currentTarget.getAttribute("data-uid");

            this.props.history.push({
                pathname: `/model/${id}`,
                state: {
                    modal: true
                }
            });
        }
    }

    handleModelHover(uid) {
        if (this.props.requestFallback) {
            this.props.requestFallback(uid);
        }
    }

    handleIsScanClick(uid) {
        axios({
            method: "post",
            url:
                "https://script.google.com/macros/s/AKfycbyPsFd29tbQpm9gFqNP7uTKvim_05bU5KSQCigBTnvg-_M9KnHV/exec",
            data: "model=" + uid,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        });
    }

    renderItem(index /*, key*/) {
        var model = this.props.models[index];
        return (
            <Model
                key={model.uid}
                model={model}
                clickHandler={this.handleModelClick.bind(this)}
                hoverHandler={this.handleModelHover.bind(this)}
                clickIsScanHandler={this.handleIsScanClick.bind(this)}
            />
        );
    }

    renderLoading() {
        if (this.props.isLoading) {
            return (
                <div
                    style={{
                        background: "black",
                        color: "white",
                        textAlign: "center",
                        padding: "10px"
                    }}
                >
                    Loading
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        background: "black",
                        color: "white",
                        textAlign: "center",
                        padding: "10px"
                    }}
                    onClick={this.loadMore.bind(this)}
                >
                    Load more
                </div>
            );
        }
    }

    render() {
        return (
            <div
                className="browse-grid"
                onScroll={this.handleScroll.bind(this)}
            >
                <ReactList
                    ref="list"
                    itemRenderer={this.renderItem.bind(this)}
                    length={this.props.models.length}
                    type="uniform"
                    models={this.props.models}
                />{" "}
                {this.renderLoading()}
            </div>
        );
    }
}

export default Grid;

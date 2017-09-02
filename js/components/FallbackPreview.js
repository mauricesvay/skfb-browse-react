import React from "react";

const FALLBACK_WIDTH = 4800;
const FRAME_WIDTH = 320;
const FRAME_HEIGHT = 180;

class FallbackPreview extends React.Component {
    componentDidMount() {
        this.ctx = this.el.getContext("2d");
        this.width = this.el.clientWidth;
        this.height = this.el.clientHeight;
        this.el.width = this.width;
        this.el.height = this.height;
        this.image = null;
        this.imageComplete = false;
    }

    componentDidUpdate() {
        const fallbackUrl = this.props.fallback && this.props.fallback.url;
        if (fallbackUrl) {
            this.image = new Image();
            this.imageComplete = false;
            this.image.onload = () => {
                this.imageComplete = true;
            };
            this.image.src = fallbackUrl;
        }
    }

    drawFrame(progress) {
        var x =
            FALLBACK_WIDTH * progress -
            (FALLBACK_WIDTH * progress) % FRAME_WIDTH;
        if (x < 0) {
            x += FALLBACK_WIDTH;
        }

        //@TODO: fix aspect ratio
        //@TODO: render hint that image is loaded
        if (this.ctx && this.imageComplete) {
            this.ctx.drawImage(
                this.image,
                FALLBACK_WIDTH - x,
                0,
                FRAME_WIDTH,
                FRAME_HEIGHT,
                0,
                0,
                this.width,
                this.height
            );
        }
    }

    handleMouseOver(e) {
        var progress = (e.layerX - this.width / 2) / this.width;
        this.drawFrame(progress);
    }

    render() {
        var fallbackUrl = this.props.fallback && this.props.fallback.url;

        return (
            <div
                className="fallback-container"
                onmousemove={this.handleMouseOver.bind(this)}
            >
                <canvas
                    className="fallback-image"
                    ref={el => {
                        this.el = el;
                    }}
                />
            </div>
        );
    }
}

export default FallbackPreview;

import React from 'react';

class FallbackPreview extends React.Component {
    render() {
        var fallbackUrl = this.props.fallback && this.props.fallback.url;

        return (
            <div className="fallback-container">
                <div className="fallback-image" style={{
                    backgroundImage: 'url(' + ( fallbackUrl
                        ? fallbackUrl
                        : '' ) + ')'
                }}></div>
            </div>
        );
    }
};

export default FallbackPreview;

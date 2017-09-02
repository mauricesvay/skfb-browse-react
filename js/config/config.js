var config = {
    oauth2: {}
};

if (process.env.NODE_ENV === "development") {
    config.oauth2 = {
        client_id: "ig-3miFgAznsYmxUP9VGoN@Chj7ZIrUfAG!UWwne",
        redirect_uri: "http://localhost:8000/authSuccess.html"
    };
} else {
    config.oauth2 = {
        client_id: "14n34mqrKBbR1hF6QxZMjnqLUFbsZgZ9Bn4WNJCj",
        redirect_uri:
            "http://mauricesvay.github.io/skfb-browse-react/authSuccess.html"
    };
}

module.exports = config;

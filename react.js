class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses:[]
    }
    axios
      .get("https://yelp-search.herokuapp.com/search", {
        params: {
          location: "Philadelphia",
          term: "pizza"
        }
      })
      .then(function(response) {
        this.setState({businesses: response.date.title, })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <YelpResults results={businesses} />
      </div>
    );
  }
}

function YelpResults(props) {
  let businesses = props.results.map(function(result, index) {
    return (
      <div key={index}>
        <div className="businessName">{result.name}</div>
        <img className="businessImage" src={result.image_url} alt="" />
      </div>
    );
  });
  return <div>{businesses}</div>;
}

ReactDOM.render(<App />, document.getElementById("react"));

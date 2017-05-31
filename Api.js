class ApiMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termSearch: "",
      locationSearch: "",
      businesses: []
    };
    this.setStateTerm = this.setStateTerm.bind(this);
    this.setStateLocation = this.setStateLocation.bind(this);
    this.runApi = this.runApi.bind(this);
  }
  render() {
    return (
      <div>
        <h1>Please Search For Your Business</h1>
        <input
          placeholder="business-term"
          value={this.state.termSearch}
          onChange={this.setStateTerm}
        />
        <input
          placeholder="business-location"
          value={this.state.locationSearch}
          onChange={this.setStateLocation}
        />
        <button onClick={this.runApi}>Click Me!</button>
        <CreateBusinessDivs results={this.state.businesses} />
      </div>
    );
  }
  setStateTerm(event) {
    this.setState({ termSearch: event.target.value });
  }
  setStateLocation(event) {
    this.setState({ locationSearch: event.target.value });
  }
  runApi() {
    axios
      .get("https://yelp-search.herokuapp.com/search", {
        params: {
          term: this.state.termSearch,
          location: this.state.locationSearch
        }
      })
      .then(
        function(response) {
          console.log(response);
          this.setState({ businesses: response.data.businesses });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }
}

function CreateBusinessDivs(props) {
  console.log(props);
  let businesses = props.results.map(function(business, index) {
    return (
      <div className="mainContainer" key={index}>
        <div className="businessName">{business.name}</div>
        <img className="businessPicture" src={business.image_url} />
      </div>
    );
  });
  return (
    <div className="backContainer">
      <div>{businesses}</div>
    </div>
  );
}
ReactDOM.render(<ApiMaster />, document.getElementById("react"));

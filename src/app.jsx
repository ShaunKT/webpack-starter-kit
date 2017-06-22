import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Helmet from "react-helmet";

import Menu from "./components/navigation.jsx";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Welcome to our Homepage" />
        <Menu />
        <h1>Homepage</h1>
      </div>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <Helmet title="About the Site" />
        <Menu />
        <h1>About</h1>
      </div>
    );
  }
}

class Contact extends Component {
  render() {
    return (
      <div>
        <Helmet title="Contact Us" />
        <Menu />
        <h1>Contact</h1>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet
          htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
          titleTemplate="%s | React App"
          titleAttributes={{itemprop: "name", lang: "en"}}
          meta={[
            {name: "description", content: "Server side rendering example"},
            {name: "viewport", content: "width=device-width, initial-scale=1"}
          ]}
        />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    );
  }
}

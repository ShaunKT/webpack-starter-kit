import React from 'react';

// asyncRoute lets us lazy load components
function asyncRoute(getComponent, collection) {
  return class AsyncComponent extends React.Component {

    constructor(props) {
      super(props);

      this.Component = null;
      this.state = { Component: AsyncComponent.Component };
    }

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;

          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;

      if (Component) {
        return (
          <Component { ...this.props } { ...collection } />
        );
      }
      return (<div>loading...</div>);
    }
  };
}

export const Home = asyncRoute(() => import('../container/component/home.js').then(module => module.default), { name: 'Home' });
export const About = asyncRoute(() => import('../container/component/about.js').then(module => module.default), { name: 'About' });

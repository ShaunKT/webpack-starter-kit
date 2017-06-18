// LIBS
import React from 'react';

// COMPONENTS
import HeaderContainer from '../components/header/header';
import ContentContainer from '../components/content/content';
import FooterContainer from '../components/footer/footer';

class Main extends React.Component{

  render() {
    return(
      <div className='container'>
          <HeaderContainer />
          <ContentContainer />
          <FooterContainer />
      </div>
    );
  }
}

export default Main;
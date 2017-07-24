// @flow
// Redux
import { connect } from 'react-redux';

// Actions
import { sayHello } from '../../../actions/hello';

// Elements
import Button from './button';

const mapStateToProps = () => ({
  label: 'Say hello'
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => {
    dispatch(sayHello('Hello You have clicked the button'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);
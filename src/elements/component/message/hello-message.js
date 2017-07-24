// @flow
// Redux
import { connect } from 'react-redux';

// Elements
import Message from './message';

const mapStateToProps = state => ({
  message: state.hello.get('message')
})

export default connect(mapStateToProps)(Message);
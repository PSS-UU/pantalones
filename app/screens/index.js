import { connect } from 'react-redux';
import HomeScreenComponent from './HomeScreen';
export { DetailsScreen } from './DetailsScreen';

const mapHomeStateToProps = state => {
  const { auth } = state;
  return { auth };
};

export const HomeScreen = connect(mapHomeStateToProps)(HomeScreenComponent);

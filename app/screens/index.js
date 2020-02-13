import { connect } from "react-redux";
import HomeScreenComponent from "./HomeScreen";
import { setUser } from "../state/actions";
export { DetailsScreen } from "./DetailsScreen";

const mapHomeStateToProps = state => ({
  auth: state.auth
});

const mapHomeDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export const HomeScreen = connect(
  mapHomeStateToProps,
  mapHomeDispatchToProps
)(HomeScreenComponent);

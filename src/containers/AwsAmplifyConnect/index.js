import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import API from '@aws-amplify/api';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

class AwsAmplifyConnect extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    this.subSubscription = null;
  }

  getInitialState() {
    const { query } = this.props;
    return {
      loading: query && !!query.query,
      data: {},
      errors: [],
      mutation: () => console.warn('Not implemented'),
    };
  }

  getDefaultState() {
    return {
      loading: false,
      data: {},
      errors: [],
      mutation: () => console.warn('Not implemented'),
    };
  }

  async _fetchData() {
    this._unsubscribe(); // eslint-disable-line no-underscore-dangle
    this.setState({ loading: true });

    const {
      query: { query, variables = {} } = {},
      mutation: { query: mutation } = {},
      subscription,
      onSubscriptionMsg = prevData => prevData,
      queryActions,
      mutationActions,
      subscriptionActions,
      dispatch,
    } = this.props;

    let { data, mutation: mutationProp, errors } = this.getDefaultState();

    if (
      !API ||
      typeof API.graphql !== 'function' ||
      typeof API.getGraphqlOperationType !== 'function'
    ) {
      throw new Error(
        'No API module found, please ensure @aws-amplify/api is imported',
      );
    }

    const hasValidQuery =
      query && API.getGraphqlOperationType(query) === 'query';
    const hasValidMutation =
      mutation && API.getGraphqlOperationType(mutation) === 'mutation';
    const hasValidSubscription =
      subscription &&
      API.getGraphqlOperationType(subscription.query) === 'subscription';

    if (!hasValidQuery && !hasValidMutation && !hasValidSubscription) {
      console.warn('No query, mutation or subscription was specified');
    }

    if (hasValidQuery) {
      try {
        data = null;
        // Before sending query request
        if (isFunction(get(queryActions, 'request')))
          dispatch(queryActions.request(variables));

        const response = await API.graphql({ query, variables });

        // After query request success
        if (isFunction(get(queryActions, 'success')))
          dispatch(queryActions.success(response.data));

        data = response.data;
      } catch (err) {
        // Query request failure
        if (isFunction(get(queryActions, 'failure')))
          dispatch(queryActions.failure(err.errors));

        data = err.data;
        errors = err.errors;
      }
    }

    if (hasValidMutation) {
      // TODO: split into Connect and Mutation component,
      // cause there is only one 'data' props for query/mutation success callback
      mutationProp = async mutationVariables => {
        try {
          // Before sending mutation request
          if (isFunction(get(mutationActions, 'request')))
            dispatch(mutationActions.request(mutationVariables));

          const result = await API.graphql({
            query: mutation,
            variables: mutationVariables,
          });

          // After mutation request success
          if (isFunction(get(mutationActions, 'success')))
            dispatch(mutationActions.success(result));

          this.forceUpdate();
          // return result;
        } catch (err) {
          // Mutation request failure
          if (isFunction(get(mutationActions, 'failure')))
            dispatch(mutationActions.failure(err.errors));

          // Here we don't change 'errors' props for children node,
          // otherwise it's gonna confuse scenario for query and mutation at same time.
          // errors = err.errors;
        }
      };
    }

    if (hasValidSubscription) {
      const { query: subsQuery, variables: subsVars } = subscription;

      try {
        // Before sending subscription request
        if (isFunction(get(subscriptionActions, 'request')))
          dispatch(subscriptionActions.request(variables));

        const observable = API.graphql({
          query: subsQuery,
          variables: subsVars,
        });

        this.subSubscription = observable.subscribe({
          next: ({ value: { data: subscribedData } }) => {
            // After subscription request success
            if (isFunction(get(subscriptionActions, 'success')))
              dispatch(subscriptionActions.success(subscribedData));

            const { data: prevData } = this.state;
            const newData = onSubscriptionMsg(prevData, subscribedData);
            this.setState({ data: newData });
          },
          error: err => console.error(err),
        });
      } catch (err) {
        // Subscription request failure
        if (isFunction(get(subscriptionActions, 'failure')))
          dispatch(subscriptionActions.failure(err.errors));

        errors = err.errors;
      }
    }

    this.setState({ data, errors, mutation: mutationProp, loading: false });
  }

  _unsubscribe() {
    if (this.subSubscription) {
      this.subSubscription.unsubscribe();
    }
  }

  async componentDidMount() {
    this._fetchData(); // eslint-disable-line no-underscore-dangle
  }

  componentWillUnmount() {
    this._unsubscribe(); // eslint-disable-line no-underscore-dangle
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.state;

    const { query: newQueryObj, mutation: newMutationObj } = this.props;
    const { query: prevQueryObj, mutation: prevMutationObj } = prevProps;

    // query
    const { query: newQuery, variables: newQueryVariables } = newQueryObj || {};
    const { query: prevQuery, variables: prevQueryVariables } =
      prevQueryObj || {};
    const queryChanged =
      prevQuery !== newQuery ||
      JSON.stringify(prevQueryVariables) !== JSON.stringify(newQueryVariables);

    // mutation
    const { query: newMutation, variables: newMutationVariables } =
      newMutationObj || {};
    const { query: prevMutation, variables: prevMutationVariables } =
      prevMutationObj || {};
    const mutationChanged =
      prevMutation !== newMutation ||
      JSON.stringify(prevMutationVariables) !==
        JSON.stringify(newMutationVariables);

    if (!loading && (queryChanged || mutationChanged)) {
      this._fetchData(); // eslint-disable-line no-underscore-dangle
    }
  }

  render() {
    const { data, loading, mutation, errors } = this.state;
    return this.props.children({ data, errors, loading, mutation }) || null;
  }
}

AwsAmplifyConnect.propTypes = {
  children: PropTypes.any,
  query: PropTypes.shape({
    query: PropTypes.any,
    variables: PropTypes.object,
  }),
  mutation: PropTypes.shape({
    query: PropTypes.any,
    variables: PropTypes.object,
  }),
  subscription: PropTypes.shape({
    query: PropTypes.any,
    variables: PropTypes.object,
  }),
  queryActions: PropTypes.shape({
    request: PropTypes.func,
    success: PropTypes.func,
    failure: PropTypes.func,
  }),
  mutationActions: PropTypes.shape({
    request: PropTypes.func,
    success: PropTypes.func,
    failure: PropTypes.func,
  }),
  subscriptionActions: PropTypes.shape({
    request: PropTypes.func,
    success: PropTypes.func,
    failure: PropTypes.func,
  }),
  onSubscriptionMsg: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(AwsAmplifyConnect);

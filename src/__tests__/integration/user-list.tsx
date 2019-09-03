import { ReactWrapper } from 'enzyme';
import { USER_FETCH, USER_SORT } from '../../type';
import * as selectors from '../../selectors/user-list';
import {
  IUserListProps,
  IUserListState,
} from '../../interfaces';
import { UserList } from '../../components/user-list';
import { reducer } from '../../reducers/user';
import { setUpIntegratedTest, getState } from '../../utils';
import * as actions from '../../actions/users';

describe('integration test user list component', () => {
  let wrapper : ReactWrapper;
  const props : IUserListProps = {
    users: [],
    fetching: true,
    searchInput: actions.searchInput,
    filterUser: actions.filterUser,
    fetchUsers: actions.fetchUsers,
    sortUser: actions.sortUser,
  };

  beforeEach(() => {
    wrapper = setUpIntegratedTest(UserList, props);
  });

  it('data fetching', () => {
    const INITIAL_STATE : IUserListState = {
      fetching: true,
      error: '',
      search: '',
      users: [],
      sort: false,
    };
    expect(reducer(INITIAL_STATE, { type: USER_FETCH })).toEqual(getState().user);
    expect(selectors.getFetching(getState())).toEqual(true);
    expect(selectors.getUsers(getState())).toEqual([]);
  });

  it('search input', () => {
    const value  = 'testing with new value';
    wrapper.find('#search').at(1)
      .simulate('change', { target: { label: 'search', value } });
    expect(selectors.getSearch(getState())).toEqual(value);
    expect(selectors.getUsers(getState())).toEqual([]);
  });

  it('sort', () => {
    wrapper.find('#sort').at(0).simulate('click');
    const INITIAL_STATE : IUserListState = {
      fetching: false,
      error: '',
      search: 'testing with new value',
      users: [],
      sort: false,
    };
    expect(reducer(INITIAL_STATE, { type: USER_SORT })).toEqual(getState().user);
    expect(selectors.getSort(getState())).toEqual(true);
    expect(selectors.getUsers(getState())).toEqual([]);
  });
});

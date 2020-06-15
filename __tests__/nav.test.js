import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Nav from '../components/Nav';
import {CURRENT_USER_QUERY} from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const notSignedInMocks = [
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: {
            data: {
                me: null
            }
        }
    }
];

const signInMocks = [
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: {
            data: {
                me: fakeUser()
            }
        }
    }
];

const signInMockswithCartItems = [
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: {
            data: {
                me: {
                    ...fakeUser(),
                    cart: [fakeCartItem(), fakeCartItem()]
                }
            }
        }
    }
];

describe('<Nav />', () => {
    it('renders a minimal nav when sighned out', async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMocks}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('ul[data-test="nav"]');
        expect(toJSON(nav)).toMatchSnapshot();
    });

    it('renders full nav when signed in', async() => {
        const wrapper = mount(
            <MockedProvider mocks={signInMocks}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('ul[data-test="nav"]');
        //expect(toJSON(nav)).toMatchSnapshot();
        expect(nav.children().length).toBe(6);
        expect(nav.text()).toContain('Sign out');
    });

    it('renders the amount of items in the cart', async() => {
        const wrapper = mount(
            <MockedProvider mocks={signInMockswithCartItems}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('[data-test="nav"]');
        const cart = nav.find('div.count');
        expect(toJSON(cart)).toMatchSnapshot();
    });
})
import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import Order, { CREATE_ORDER_MUTATION, SINGLE_ORDER_QUERY } from '../components/Order';
import { fakeOrder } from '../lib/testUtils';

const mocks = [
    {
        request: {
            query: SINGLE_ORDER_QUERY,
            variables: {
                id: 'ord123'
            }
        },
        result: {
            data: {
                order: fakeOrder()
            }
        }
    }
];

describe('<Order />', () => {
    it('renders the order', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Order id="ord123" />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const order = wrapper.find('div[data-test="order"]');
        expect(toJSON(order)).toMatchSnapshot();
    });
    it('renders order total', async () => {
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Order id="ord123" />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const order = wrapper.find('div[data-test="order"]');
        expect(order.find('span.orderTotal').text()).toEqual('$400');
        expect()
    });
});
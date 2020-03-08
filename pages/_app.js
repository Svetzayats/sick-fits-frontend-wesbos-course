import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
    //это специальный lifecicle метод nextjs
    static async getInitialProps({ Component, ctx}) {
        //это все нужно для нумерации страниц, раньше экспресс делал это под капотом 
        //это нужно для server-side projects 
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        //это запрос к юзеру доставляет
        pageProps.query = ctx.query;
        return { pageProps };
    }
    render() {
        const { Component, apollo, pageProps } = this.props;
        return (
            <Container>
                <ApolloProvider client={apollo}>
                   <Page>
                    <Component { ...pageProps }/>
                </Page> 
                </ApolloProvider>
                
            </Container>
        );
    }
}

export default withData(MyApp);
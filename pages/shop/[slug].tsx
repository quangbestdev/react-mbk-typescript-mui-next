import withApollo from '../../src/withApollo'
import Product from '../../src/views/Product/Product'

export default withApollo({ ssr: true })(Product)

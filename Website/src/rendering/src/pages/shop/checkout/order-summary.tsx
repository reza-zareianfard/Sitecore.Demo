import { ReactElement } from 'react';
import Head from 'next/head';
import { ShopLayout } from 'components/Products/Shop';
import LineItemList from '../../../components/Checkout/LineItemList';
import ThankYouSection from 'components/Checkout/ThankYouSection';
import ThankYouHero from 'components/Checkout/ThankYouHero';
import useOcCurrentCart from '../../../hooks/useOcCurrentCart';

const OrderSummary = (): JSX.Element => {
  const { order } = useOcCurrentCart();

  const cartContent = order != null && (
    <div className="order-review-details shop-container">
      <h3>Order review</h3>
      <div className="grid-container">
        <div className="panel line-items-panel">
          <div className="panel-header">
            <h2>Items</h2>
          </div>
          <div className="panel-body">
            <LineItemList editable={false} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ThankYouHero />
      <div>{cartContent}</div>
      <ThankYouSection />
    </>
  );
};

OrderSummary.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>PLAY! SHOP - Order Summary</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default OrderSummary;

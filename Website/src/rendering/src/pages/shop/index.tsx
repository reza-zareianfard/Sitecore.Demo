import Head from 'next/head';
import { ReactElement } from 'react';
import { ShopLayout } from '../../components/Products/Shop';
import CategoriesList from '../../components/Products/CategoriesList';
import DiscoverWidget from '../../components/ShopCommon/DiscoverWidget';

const Shop = (): JSX.Element => {
  return (
    <>
      <CategoriesList
        title="Welcome to OrderCloud Demo"
        subtitle="Shop Trending Categories:"
        theme="orange"
      />
      <DiscoverWidget rfkId="rfkid_36" />
      <DiscoverWidget rfkId="rfkid_2" />
      <DiscoverWidget rfkId="rfkid_1" />
      <DiscoverWidget rfkId="rfkid_3" />
      <DiscoverWidget rfkId="ps_geo" />
    </>
  );
};

Shop.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShopLayout>
      <Head>
        <title>Zip OrderCloud Demo</title>
      </Head>

      {page}
    </ShopLayout>
  );
};

export default Shop;

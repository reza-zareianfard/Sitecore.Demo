import Link from 'next/link';
import React, { useRef, useState } from 'react';
import useOcCurrentCart from '../../hooks/useOcCurrentCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import MiniCart from '../Checkout/MiniCart';
import CartBadge from '../ShopCommon/CartBadge';
import DiscoverWidget from '../ShopCommon/DiscoverWidget';
import PreviewSearch, { PreviewSearchProps } from '../PreviewSearch/PreviewSearch';
import { isAuthenticationEnabled } from '../../services/AuthenticationService';
import ClickOutside from '../ShopCommon/ClickOutside';
import AccountPopup from './AccountPopup';
import { dispatchDiscoverCartStatusListActionEvent } from '../../helpers/discover/CartStatusDispatcher';

export type ShopNavigationProps = {
  previewSearchProps?: PreviewSearchProps; // For Storybook support
};

const ShopNavigation = (props: ShopNavigationProps): JSX.Element => {
  const { lineItems } = useOcCurrentCart();

  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const miniCartRef = useRef(null);
  const closeMinicart = () => setIsMiniCartOpen(false);
  ClickOutside([miniCartRef], closeMinicart);

  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const accountPopupRef = useRef(null);
  const closeAccountPopup = () => setIsAccountPopupOpen(false);
  ClickOutside([accountPopupRef], closeAccountPopup);

  const accountPopupActiveClass = isAccountPopupOpen ? 'active' : '';
  const accountPopupOpenClass = isAccountPopupOpen ? 'open' : '';
  const accountMenuItem = isAuthenticationEnabled && (
    <li className={`shop-navigation-menu-item ${accountPopupActiveClass}`} ref={accountPopupRef}>
      <button onClick={() => setIsAccountPopupOpen(!isAccountPopupOpen)}>
        <FontAwesomeIcon id="user-icon" icon={faUserCircle} />
      </button>
      <div className={`account-popup-wrapper ${accountPopupOpenClass}`}>
        <AccountPopup onNavigatingAway={closeAccountPopup} />
      </div>
    </li>
  );

  const handleCartIconClick = () => {
    if (!isMiniCartOpen && lineItems?.length !== undefined) {
      dispatchDiscoverCartStatusListActionEvent(lineItems);
    }
    setIsMiniCartOpen(!isMiniCartOpen);
  };

  const previewSearchWidget = props.previewSearchProps ? (
    <PreviewSearch {...props.previewSearchProps} />
  ) : (
    <DiscoverWidget rfkId="rfkid_6" />
  );

  const miniCartActiveClass = isMiniCartOpen ? 'active' : '';
  const miniCartOpenClass = isMiniCartOpen ? 'open' : '';

  return (
    <nav className="shop-navigation">
      <div className="shop-container shop-navigation-content">
        <div className="logo-container">
          <Link href="/shop">
            <a className="logo-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 287.34 60" width="180"><title>Codehouse logo</title><defs><style>.{"c{fill:#bc1a28;}.d{fill:#3f3f3f;}"}</style></defs><g id="a"></g><g id="b"><g><path class="d" d="M103.13,38.33l-.93-2.94s-2.7,2.04-6.55,2.04c-4.24,0-6.11-2.65-6.11-6.03s2.43-5.69,5.98-5.69,5.32,1.5,5.32,1.5l1.35-2.94s-2.04-1.62-6.67-1.62c-6.23,0-9.54,3.51-9.54,8.75,0,4.93,2.65,9.1,9.54,9.1,5,0,7.6-2.16,7.6-2.16Z"></path><path class="d" d="M127.5,31.52c0-5.25-3.53-8.88-9.42-8.88s-9.42,3.63-9.42,8.88c0,4.85,2.94,8.97,9.42,8.97s9.42-4.12,9.42-8.97Zm-3.51,0c0,3.21-1.79,5.91-5.91,5.91s-5.93-2.7-5.93-5.91c0-3.46,2.23-5.81,5.93-5.81s5.91,2.35,5.91,5.81Z"></path><path class="d" d="M134.97,40.12h6.79c5.69,0,9.27-2.82,9.27-8.48s-3.29-8.68-9.27-8.68h-6.79v17.16Zm6.4-3.04h-2.94v-11.08h2.84c4.14,0,6.28,1.72,6.28,5.64s-2.18,5.47-6.18,5.44Z"></path><path class="d" d="M158.58,40.12h13.73v-3.04h-10.27v-4.09h8.17v-2.8h-8.17v-4.19h10.27v-3.04h-13.73v17.16Z"></path><path class="d" d="M191.72,40.12h3.46V22.96h-3.46v7.28h-8.39v-7.28h-3.46v17.16h3.46v-6.84h8.39v6.84Z"></path><path class="d" d="M221.5,31.52c0-5.25-3.53-8.88-9.42-8.88s-9.42,3.63-9.42,8.88c0,4.85,2.94,8.97,9.42,8.97s9.42-4.12,9.42-8.97Zm-3.51,0c0,3.21-1.79,5.91-5.91,5.91s-5.93-2.7-5.93-5.91c0-3.46,2.23-5.81,5.93-5.81s5.91,2.35,5.91,5.81Z"></path><path class="d" d="M240.37,22.96v10.03c0,3.31-1.25,4.51-4.09,4.51s-4.05-1.28-4.05-4.51v-10.03h-3.43v9.91c0,5.57,2.38,7.6,7.48,7.63,5.22-.05,7.55-2.06,7.55-7.63v-9.91h-3.46Z"></path><path class="d" d="M264.76,27.32l1.23-2.97s-2.72-1.72-7.33-1.72c-4.88,0-7.31,2.43-7.28,5.22,0,3.7,3.24,4.66,7.16,5.35,3.26,.61,3.97,1.01,3.97,2.21s-1.37,2.01-3.8,2.01c-4.07,0-6.33-2.11-6.33-2.11l-1.52,2.72s2.13,2.43,7.85,2.45c4.98,.02,7.45-2.21,7.45-5.17,0-3.36-2.35-4.51-6.99-5.32-2.35-.42-4.17-.93-4.17-2.33,0-1.08,1.08-1.91,3.68-1.91,3.95,0,6.08,1.57,6.08,1.57Z"></path><path class="d" d="M273.61,40.12h13.73v-3.04h-10.27v-4.09h8.17v-2.8h-8.17v-4.19h10.27v-3.04h-13.73v17.16Z"></path><path class="c" d="M52.43,15.44c1.53,0,3.03-.45,4.3-1.3,1.27-.85,2.27-2.05,2.85-3.47,.59-1.41,.74-2.96,.44-4.46-.3-1.5-1.04-2.87-2.12-3.95-1.08-1.08-2.46-1.82-3.97-2.11-1.5-.3-3.06-.15-4.48,.44-1.42,.58-2.63,1.57-3.48,2.84-.85,1.27-1.31,2.76-1.31,4.29,0,1.01,.2,2.02,.59,2.96,.39,.94,.96,1.79,1.68,2.51,.72,.72,1.57,1.29,2.52,1.67,.94,.39,1.95,.59,2.97,.59h0Zm0,6.84c-3.87-.01-7.57-1.55-10.29-4.28-2.73-2.73-4.26-6.43-4.25-10.28,0-2.05-.82-4.01-2.27-5.46C34.16,.82,32.19,0,30.14,0s-4.02,.81-5.48,2.26c-1.45,1.45-2.27,3.41-2.27,5.46,0,1.92-.37,3.81-1.11,5.58-.74,1.77-1.81,3.38-3.17,4.73-1.36,1.35-2.97,2.42-4.75,3.15-1.78,.73-3.68,1.1-5.6,1.1-2.06,0-4.03,.81-5.48,2.26C.82,25.99,0,27.96,0,30c0,2.05,.81,4.02,2.27,5.46,1.45,1.45,3.42,2.27,5.48,2.27h0c1.92,0,3.82,.38,5.59,1.11,1.77,.73,3.38,1.8,4.74,3.16,1.36,1.35,2.43,2.96,3.16,4.72s1.11,3.66,1.11,5.57c0,1.53,.46,3.02,1.31,4.28,.85,1.27,2.06,2.25,3.48,2.84,1.41,.58,2.97,.73,4.47,.44,1.5-.3,2.88-1.03,3.96-2.11,1.08-1.08,1.82-2.45,2.12-3.95,.3-1.5,.14-3.05-.44-4.46s-1.58-2.61-2.85-3.46c-1.27-.85-2.77-1.3-4.3-1.3-2.89,0-5.72-.85-8.12-2.45-2.4-1.6-4.28-3.87-5.39-6.53-1.11-2.66-1.4-5.59-.84-8.41s1.95-5.42,3.99-7.46c2.04-2.04,4.64-3.43,7.48-3.99,2.83-.56,5.77-.28,8.44,.82,2.67,1.1,4.95,2.97,6.56,5.36,1.61,2.39,2.47,5.21,2.47,8.09,0,1.01,.2,2.02,.58,2.96s.96,1.79,1.68,2.51c.72,.72,1.57,1.29,2.51,1.68,.94,.39,1.95,.59,2.97,.59h0c2.05,0,4.03-.81,5.48-2.26,1.45-1.45,2.27-3.41,2.27-5.46s-.82-4.01-2.27-5.46c-1.45-1.45-3.42-2.26-5.48-2.26h0Z"></path></g></g></svg>
            </a>
          </Link>
        </div>
        <div className="items-container">
          <ul>
            <li
              className={`shop-navigation-menu-item cart-menu-item ${miniCartActiveClass}`}
              ref={miniCartRef}
            >
              <button onClick={handleCartIconClick}>
                <FontAwesomeIcon id="cart-icon" icon={faShoppingCart} />
                <CartBadge />
              </button>
              <div className={`mini-cart-wrapper ${miniCartOpenClass}`}>
                <MiniCart onNavigatingAway={closeMinicart} />
              </div>
            </li>
            {accountMenuItem}
          </ul>
        </div>
        <div className="shop-search-input-container">
          <div id="search-input-container">{previewSearchWidget}</div>
        </div>
      </div>
    </nav>
  );
};

export default ShopNavigation;

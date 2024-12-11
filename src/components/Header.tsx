import { Fragment, useState } from 'react';
import { RiMenu2Line, RiHistoryLine, RiCalculatorLine, RiHome4Line } from '@remixicon/react';

import Drawer from '@vote-seat-web-app/components/Drawer';
import RouteItemList from '@vote-seat-web-app/components/RouteItemList';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <Fragment>
            <header className="header">
                <button className="header__menu-btn" type="button" onClick={toggleDrawer}>
                    <RiMenu2Line size={24} />
                </button>
                <div className="header__logo">VoteSeat</div>
            </header>
            <Drawer isOpen={isOpen} onClose={toggleDrawer}>
                <RouteItemList LogoComponent={RiHome4Line} label="Home" onClick={toggleDrawer} to="/" />
                <RouteItemList
                    LogoComponent={RiCalculatorLine}
                    label="Calcular escaños"
                    onClick={toggleDrawer}
                    to="/calculate"
                />
                <RouteItemList LogoComponent={RiHistoryLine} label="Historial" onClick={toggleDrawer} to="/history" />
            </Drawer>
        </Fragment>
    );
};

export default Header;

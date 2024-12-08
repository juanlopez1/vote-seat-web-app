import { RiMenu2Line } from '@remixicon/react';

const Header = () => {
    return (
        <header className="header">
            <button className="header__menu-btn" type="button">
                <RiMenu2Line size={24} color="#fff" />
            </button>
            <div className="header__logo">VoteSeat</div>
        </header>
    );
};

export default Header;

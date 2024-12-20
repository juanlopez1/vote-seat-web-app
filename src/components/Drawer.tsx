import type { FC, PropsWithChildren } from 'react';
import { RiCloseLine, RiLogoutBoxLine } from '@remixicon/react';

import useSession from '@vote-seat-web-app/contexts/session.context';

type DrawerProps = PropsWithChildren & {
    isOpen: boolean;
    onClose: () => void;
};

const Drawer: FC<DrawerProps> = ({ children, isOpen, onClose }) => {
    const { session, logout } = useSession();
    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer__content">
                <div className="drawer__header">
                    <div className="drawer__header__logo">VoteSeat</div>
                    <button type="button" className="drawer__header__close-btn" onClick={onClose}>
                        <RiCloseLine size={30} />
                    </button>
                </div>
                <button type="button" className="drawer__logout-btn" onClick={logout}>
                    {session?.username}
                    <RiLogoutBoxLine size={25} />
                </button>
                <ul>{children}</ul>
            </div>
        </div>
    );
};

export default Drawer;

import type { FC } from 'react';
import { Link, useMatch } from 'react-router-dom';
import type { RemixiconComponentType } from '@remixicon/react';

type RouteItemListProps = {
    label: string;
    LogoComponent: RemixiconComponentType;
    onClick: () => void;
    to: string;
};

const RouteItemList: FC<RouteItemListProps> = ({ LogoComponent, label, onClick, to }) => {
    const match = useMatch(to);
    return (
        <li>
            <Link to={to} onClick={onClick} className={`${match && 'selected'}`}>
                <LogoComponent size={30} />
                {label}
                {match && <span className="badge" />}
            </Link>
        </li>
    );
};

export default RouteItemList;

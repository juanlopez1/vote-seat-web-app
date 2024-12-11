import type { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowLeftLine } from '@remixicon/react';

type BackLinkProps = PropsWithChildren & {
    to: string;
};

const BackLink: FC<BackLinkProps> = ({ children, to }) => (
    <Link to={to} className="back-link">
        <RiArrowLeftLine size={18} />
        {children}
    </Link>
);

export default BackLink;
